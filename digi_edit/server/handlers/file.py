"""File handlers."""
import logging
import os

from base64 import urlsafe_b64encode as b64encode, urlsafe_b64decode as b64decode
from sqlalchemy import select

from .base import JsonApiHandler
from ...models import get_sessionmaker, Branch
from ...utils import config, get_branch_name, run_git_command


logger = logging.getLogger(__name__)


class FileCollectionHandler(JsonApiHandler):
    """Handler for file collections."""

    async def get(self: 'FileCollectionHandler', branch_id: str) -> None:
        """Fetch all files for a branch."""
        async with get_sessionmaker()() as dbsession:
            query = select(Branch).filter(Branch.id == int(branch_id))
            result = await dbsession.execute(query)
            branch = result.scalar()
            if branch is not None:
                branch_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                if os.path.exists(branch_dir):
                    await run_git_command('checkout', 'default', cwd=branch_dir)
                    await run_git_command('pull', cwd=branch_dir)
                    await run_git_command('checkout', get_branch_name(str(branch.id)), cwd=branch_dir)
                    await run_git_command('pull', cwd=branch_dir)
                    files = []
                    for basepath, directories, filenames in os.walk(branch_dir):
                        for filename in filenames:
                            filepath = os.path.join(basepath, filename)
                            files.append({
                                'type': 'files',
                                'id': b64encode(filepath[len(branch_dir) + 1:].encode('utf-8')).decode('utf-8'),
                                'attributes': {
                                    'path': os.path.dirname(filepath[len(branch_dir):]),
                                    'name': filename,
                                    'mode': 'tei' if filename.endswith('.tei') else 'text',
                                }
                            })
                    self.send_jsonapi(files)
                else:
                    self.set_status(404)
            else:
                self.set_status(404)


PATCH_FILE_SCHEMA = {
    'type': {
        'type': 'string',
        'required': True,
        'allowed': ['files']
    },
    'id': {
        'type': 'string',
        'required': True,
    },
    'attributes': {
        'type': 'dict',
        'required': True,
        'schema': {
            'mode': {
                'type': 'string',
                'required': True,
                'allowed': ['tei', 'text'],
            },
            'name': {
                'type': 'string',
                'required': True,
                'empty': False,
            },
            'path': {
                'type': 'string',
                'required': True,
                'empty': False,
            },
            'rawData': {
                'type': 'string',
                'required': True,
                'empty': False,
            },
        }
    }
}


class FileItemHandler(JsonApiHandler):
    """Handler for individual files."""

    async def get(self: 'FileCollectionHandler', branch_id: str, file_id: str) -> None:
        """Get a single file."""
        logger.debug(f'Fetching single file {branch_id} {file_id}')
        async with get_sessionmaker()() as dbsession:
            query = select(Branch).filter(Branch.id == int(branch_id))
            result = await dbsession.execute(query)
            branch = result.scalar()
            if branch is not None:
                branch_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                if os.path.exists(branch_dir):
                    file_path = os.path.join(branch_dir, b64decode(file_id).decode('utf-8'))
                    if os.path.exists(file_path) and os.path.abspath(file_path).startswith(os.path.abspath(config()['git']['base-dir'])):  # noqa: E501
                        with open(file_path) as in_f:
                            data = in_f.read()
                        file = {
                            'type': 'files',
                            'id': b64encode(file_path[len(branch_dir) + 1:].encode('utf-8')).decode('utf-8'),
                            'attributes': {
                                'path': os.path.dirname(file_path[len(branch_dir):]),
                                'name': file_path,
                                'mode': 'tei' if file_path.endswith('.tei') else 'text',
                                'rawData': data,
                            }
                        }
                        self.send_jsonapi(file)
                    else:
                        self.set_status(404)
                else:
                    self.set_status(404)
            else:
                self.set_status(404)

    async def patch(self: 'FileCollectionHandler', branch_id: str, file_id: str) -> None:
        """Update the content of a single file."""
        logger.debug(f'Updating single file {branch_id} {file_id}')
        async with get_sessionmaker()() as dbsession:
            query = select(Branch).filter(Branch.id == branch_id)
            result = await dbsession.execute(query)
            branch = result.scalar()
            if branch is not None:
                branch_dir = os.path.join(config()["git"]["base-dir"], get_branch_name(str(branch.id)))
                if os.path.exists(branch_dir):
                    file_path = os.path.join(branch_dir, b64decode(file_id).decode('utf-8'))
                    if os.path.exists(file_path) and os.path.abspath(file_path).startswith(os.path.abspath(config()['git']['base-dir'])):  # noqa: E501
                        file = self.request_body(PATCH_FILE_SCHEMA)
                        with open(file_path, 'w') as out_f:
                            out_f.write(file['attributes']['rawData'])
                        user = await self.get_authorised_user()
                        await run_git_command('add', file_path[len(branch_dir) + 1:], cwd=branch_dir)
                        await run_git_command('commit', '-m', f'Updated {file_path}', '--author',
                                              f'{user.attributes["name"]} <{user.email}>', cwd=branch_dir)
                        await run_git_command('push', '--force', cwd=branch_dir)
                        self.set_status(204)
                    else:
                        self.set_status(404)
                else:
                    self.set_status(404)
            else:
                self.set_status(404)
