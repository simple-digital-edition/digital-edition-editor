"""Handlers for webhooks."""
import os
from tornado.web import RequestHandler

from gitlab import Gitlab
from shutil import rmtree
from sqlalchemy import select

from ...models import get_sessionmaker, Branch
from ...utils import config, get_branch_name, run_git_command


class GitlabWebhookHandler(RequestHandler):
    """Handler for Gitlab integrations."""

    async def post(self: 'GitlabWebhookHandler') -> None:
        """Handle all webhook requests from Gitlab."""
        gl = Gitlab(config()['git']['integration']['host'], config()['git']['integration']['auth-token'])
        gl_repo = gl.projects.get(config()['git']['integration']['project-id'])
        async with get_sessionmaker()() as dbsession:
            query = select(Branch)
            result = await dbsession.execute(query)
            for branch in result.scalars():
                if branch.attributes['status'] == 'active':
                    branch_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                    await run_git_command('checkout', config()['git']['main-branch'], cwd=branch_dir)
                    await run_git_command('pull', cwd=branch_dir)
                    await run_git_command('checkout', get_branch_name(str(branch.id)), cwd=branch_dir)
                    await run_git_command('pull', cwd=branch_dir)
                    if 'merge_request' in branch.attributes:
                        merge_request = gl_repo.mergerequests.get(branch.attributes['merge_request']['id'])
                        branch.attributes['merge_request']['state'] = merge_request.state
                        if branch.attributes['merge_request']['state'] == 'merged':
                            branch.attributes['status'] = 'merged'
                            if os.path.exists(branch_dir):
                                rmtree(branch_dir)
                        dbsession.add(branch)
                        await dbsession.commit()

    def check_xsrf_cookie(self: 'GitlabWebhookHandler') -> None:
        """Pass all requests."""
        return True
