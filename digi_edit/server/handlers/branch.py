"""Branch API handlers."""
import asyncio
import logging
import os
import shutil

from gitlab import Gitlab
from sqlalchemy import select

from .base import JsonApiHandler, JsonApiException
from ...models import get_sessionmaker, Branch
from ...utils import config, get_branch_name, run_git_command


logger = logging.getLogger(__name__)


async def branch_as_jsonapi(branch: Branch) -> dict:
    """Convert the branch to JSONAPI format."""
    result = {
        'type': 'branches',
        'id': str(branch.id),
        'attributes': {
            'name': branch.attributes['name'],
            'status': branch.attributes['status']
        }
    }
    if 'merge_request' in branch.attributes:
        result['attributes']['merge_request'] = branch.attributes['merge_request']
    if branch.attributes['status'] == 'active':
        target_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
        process = await run_git_command('log', f'{get_branch_name(str(branch.id))}..{config()["git"]["main-branch"]}',
                                        cwd=target_dir,
                                        stdout=asyncio.subprocess.PIPE,
                                        stderr=asyncio.subprocess.PIPE)
        (stdout, stderr) = await process.communicate()
        if len(stdout) > 0:
            result['attributes']['rebase_required'] = True
    return result


CREATE_BRANCH_SCHEMA = {
    'type': {
        'type': 'string',
        'required': True,
        'allowed': ['branches']
    },
    'attributes': {
        'type': 'dict',
        'required': True,
        'schema': {
            'name': {
                'type': 'string',
                'required': True,
                'empty': False,
            }
        }
    }
}


class BranchCollectionHandler(JsonApiHandler):
    """Handle requests to the collection of branches."""

    async def post(self: 'BranchCollectionHandler') -> None:
        """Handle POST requests creating new branches."""
        body = self.request_body(CREATE_BRANCH_SCHEMA)
        async with get_sessionmaker()() as dbsession:
            branch = Branch(attributes={'name': body['attributes']['name'], 'status': 'active'})
            dbsession.add(branch)
            await dbsession.commit()
        try:
            target_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
            await run_git_command('clone', config()['git']['source'], target_dir)
            await run_git_command('branch', get_branch_name(str(branch.id)), cwd=target_dir)
            await run_git_command('checkout', get_branch_name(str(branch.id)), cwd=target_dir)
            await run_git_command('push', '--set-upstream', 'origin', get_branch_name(str(branch.id)), '--force',
                                  cwd=target_dir)
            await run_git_command('config', 'user.name', config()['git']['committer']['name'], cwd=target_dir)
            await run_git_command('config', 'user.email', config()['git']['committer']['email'], cwd=target_dir)
            self.send_jsonapi(await branch_as_jsonapi(branch))
        except Exception:
            async with get_sessionmaker()() as dbsession:
                await dbsession.delete(branch)
                await dbsession.commit()
            raise JsonApiException()

    async def get(self: 'BranchCollectionHandler') -> None:
        """Handle GET requests retrieving all branches."""
        logger.debug('Fetching all active branches')
        async with get_sessionmaker()() as dbsession:
            query = select(Branch)
            result = await dbsession.execute(query)
            branches = []
            for branch in result.scalars():
                branches.append(await branch_as_jsonapi(branch))
            self.send_jsonapi(branches)


POST_BRANCH_SCHEMA = {
    'type': {
        'type': 'string',
        'required': True,
        'allowed': ['actions']
    },
    'id': {
        'type': 'string',
        'required': True,
        'allowed': ['request-merge', 'cancel-merge', 'rebase']
    }
}


class BranchItemHandler(JsonApiHandler):
    """Handle requests to individual branches."""

    async def post(self: 'BranchItemHandler', branch_id: str) -> None:
        """Handle actions to run on the branch."""
        logger.debug(f'Action on branch {branch_id}')
        body = self.request_body(POST_BRANCH_SCHEMA)
        async with get_sessionmaker()() as dbsession:
            query = select(Branch).filter(Branch.id == int(branch_id))
            result = await dbsession.execute(query)
            branch = result.scalar()
            if branch is not None:
                gl = Gitlab(config()['git']['integration']['host'], config()['git']['integration']['auth-token'])
                gl_repo = gl.projects.get(config()['git']['integration']['project-id'])
                if body['id'] == 'request-merge':
                    if 'merge_request' not in branch.attributes:
                        merge_request = gl_repo.mergerequests.create({'source_branch': get_branch_name(str(branch.id)),
                                                                      'target_branch': config()['git']['main-branch'],
                                                                      'title': branch.attributes['name']})
                        branch.attributes['merge_request'] = {
                            'id': merge_request.iid,
                            'state': merge_request.state,
                        }
                    else:
                        merge_request = gl_repo.mergerequests.get(branch.attributes['merge_request']['id'])
                        if merge_request.state == 'closed':
                            merge_request.state_event = 'reopen'
                            merge_request.save()
                        branch.attributes['merge_request']['state'] = merge_request.state
                elif body['id'] == 'cancel-merge':
                    if 'merge_request' in branch.attributes:
                        merge_request = gl_repo.mergerequests.get(branch.attributes['merge_request']['id'])
                        if merge_request.state == 'opened':
                            merge_request.state_event = 'close'
                            merge_request.save()
                        branch.attributes['merge_request']['state'] = merge_request.state
                elif body['id'] == 'rebase':
                    target_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                    await run_git_command('rebase', config()['git']['main-branch'], cwd=target_dir)
                    await run_git_command('push', 'origin', get_branch_name(str(branch.id)), '--force', cwd=target_dir)
                dbsession.add(branch)
                await dbsession.commit()
                self.send_jsonapi(await branch_as_jsonapi(branch))
            else:
                raise JsonApiException()

    async def delete(self: 'BranchItemHandler', branch_id: str) -> None:
        """Delete a branch."""
        logger.debug(f'Deleting branch {branch_id}')
        async with get_sessionmaker()() as dbsession:
            query = select(Branch).filter(Branch.id == int(branch_id))
            result = await dbsession.execute(query)
            branch = result.scalar()
            if branch is not None:
                target_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                if os.path.exists(target_dir):
                    await run_git_command('push', 'origin', '--delete', get_branch_name(str(branch.id)),
                                          cwd=target_dir)
                    shutil.rmtree(target_dir)
                await dbsession.delete(branch)
                await dbsession.commit()
                self.set_status(204)
            else:
                raise JsonApiException()
