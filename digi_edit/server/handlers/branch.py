"""Branch API handlers."""
import logging
import os
import shutil

from sqlalchemy import select

from .base import JsonApiHandler, JsonApiException
from ...models import get_sessionmaker, Branch
from ...utils import config, get_branch_name, run_git_command


logger = logging.getLogger(__name__)

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
            branch = Branch(attributes={'name': body['attributes']['name']})
            dbsession.add(branch)
            await dbsession.commit()
        try:
            target_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
            await run_git_command('clone', config()['git']['source'], target_dir)
            await run_git_command('branch', get_branch_name(str(branch.id)), cwd=target_dir)
            await run_git_command('checkout', get_branch_name(str(branch.id)), cwd=target_dir)
            await run_git_command('push', '--set-upstream', 'origin', get_branch_name(str(branch.id)), '--force',
                                  cwd=target_dir)
            self.send_jsonapi({
                'type': 'branches',
                'id': str(branch.id),
                'attributes': {
                    'name': branch.attributes['name'],
                }
            })
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
                branches.append({
                    'type': 'branches',
                    'id': str(branch.id),
                    'attributes': {
                        'name': branch.attributes['name'],
                        'status': 'active'
                    }
                })
            self.send_jsonapi(branches)


class BranchItemHandler(JsonApiHandler):
    """Handle requests to individual branches."""

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
                self.set_status(201)
            else:
                raise JsonApiException()
