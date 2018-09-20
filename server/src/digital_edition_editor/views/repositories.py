import hashlib
import os

from git import Repo
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting

from .users import is_authenticated


def repository_as_json(request, key):
    repositories = get_config_setting(request, 'git.repos')
    base_path = repositories[key]
    repository = Repo(base_path)
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
                'local-changes': [{'message': commit.message, 'author': commit.author.name}
                                  for commit in repository.iter_commits('master@{u}..master')],
                'remote-changes': [{'message': commit.message, 'author': commit.author.name}
                                   for commit in repository.iter_commits('master..master@{u}')],
                'tei-files': tei_files}}


@view_config(route_name='repositories.get', renderer='json')
@is_authenticated()
def get_repositories(request):
    repositories = get_config_setting(request, 'git.repos')
    return {'data': [repository_as_json(request, key) for key in repositories.keys()]}


@view_config(route_name='repository.get', renderer='json')
@is_authenticated()
def get_repository(request):
    repositories = get_config_setting(request, 'git.repos')
    if request.matchdict['rid'] in repositories:
        base_path = repositories[request.matchdict['rid']]
        repository = Repo(base_path)
        repository.remotes.origin.fetch()
        return {'data': repository_as_json(request, request.matchdict['rid'])}
    raise HTTPNotFound()


@view_config(route_name='repository.patch', renderer='json')
@is_authenticated()
def patch_repository(request):
    repositories = get_config_setting(request, 'git.repos')
    if request.matchdict['rid'] in repositories:
        base_path = repositories[request.matchdict['rid']]
        repository = Repo(base_path)
        repository.remotes.origin.pull(rebase=True)
        repository.remotes.origin.push()
        return {'data': repository_as_json(request, request.matchdict['rid'])}
    raise HTTPNotFound()
