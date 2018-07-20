import hashlib
import os

from git import Repo
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting


def repository_as_json(request, key):
    repositories = get_config_setting(request, 'git.repos')
    base_path = repositories[key]
    repository = Repo(base_path)
    #if not repository.is_dirty():
    #    repository.remotes.origin.pull(rebase=True)
    tei_files = {}
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                tei_files[hash.hexdigest()] = filename
    return {'type': 'repositories',
            'id': key,
            'attributes': {
                'title': key.title(),
                'is-dirty': repository.is_dirty(),
                'changes': [item.a_path for item in repository.index.diff(None)],
                'tei-files': tei_files}}


@view_config(route_name='repositories.get', renderer='json')
def get_repositories(request):
    repositories = get_config_setting(request, 'git.repos')
    return {'data': [repository_as_json(request, key) for key in repositories.keys()]}


@view_config(route_name='repository.get', renderer='json')
def get_repository(request):
    repositories = get_config_setting(request, 'git.repos')
    if request.matchdict['rid'] in repositories:
        return {'data': repository_as_json(request, request.matchdict['rid'])}
    raise HTTPNotFound()
