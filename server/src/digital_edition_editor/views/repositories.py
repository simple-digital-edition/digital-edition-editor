import hashlib
import os

from git import Repo
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting

from .users import is_authenticated


def repository_as_json(request, key):
    repositories = get_config_setting(request, 'git.repos')
    base_path = os.path.join(get_config_setting(request, 'git.basedir'),
                             request.authorized_user['userid'],
                             key)
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
                'local-changes': [{'message': commit.message, 'author': commit.author.name}
                                  for commit in repository.iter_commits('%s@{u}..%s' % (request.authorized_user['userid'],
                                                                                        request.authorized_user['userid']))],
                'remote-changes': [{'message': commit.message, 'author': commit.author.name}
                                   for commit in repository.iter_commits('master..master@{u}')],
                'tei-files': tei_files}}


@view_config(route_name='repositories.get', renderer='json')
@is_authenticated()
def get_repositories(request):
    repositories = get_config_setting(request, 'git.repos')
    return {'data': [{'type': 'repositories',
                      'id': key,
                      'attributes': {'title': key.title()}} for key in repositories.keys()]}


@view_config(route_name='repository.get', renderer='json')
@is_authenticated()
def get_repository(request):
    repositories = get_config_setting(request, 'git.repos')
    if request.matchdict['rid'] in repositories:
        base_path = os.path.join(get_config_setting(request, 'git.basedir'),
                                 request.authorized_user['userid'],
                                 request.matchdict['rid'])
        # Clone or load the repository
        if not os.path.exists(base_path):
            repository = Repo.clone_from(repositories[request.matchdict['rid']], base_path)
            # Ensure local and remote user branch exist
            if request.authorized_user['userid'] in repository.remotes.origin.refs:
                branch = repository.create_head(request.authorized_user['userid'])
                branch.set_tracking_branch(repository.remotes.origin.refs[request.authorized_user['userid']])
                branch.checkout()
            else:
                branch = repository.create_head(request.authorized_user['userid'])
                branch.checkout()
                repository.git.push('--set-upstream', 'origin', request.authorized_user['userid'])
        else:
            repository = Repo(base_path)
            # Fetch remote change information
            repository.remotes.origin.fetch()
        return {'data': repository_as_json(request, request.matchdict['rid'])}
    raise HTTPNotFound()


@view_config(route_name='repository.patch', renderer='json')
@is_authenticated()
def patch_repository(request):
    repositories = get_config_setting(request, 'git.repos')
    if request.matchdict['rid'] in repositories:
        base_path = os.path.join(get_config_setting(request, 'git.basedir'),
                                 request.authorized_user['userid'],
                                 request.matchdict['rid'])
        repository = Repo(base_path)
        # Pull the latest changes from the master branch
        repository.heads.master.checkout()
        repository.remotes.origin.pull()
        repository.heads[request.authorized_user['userid']].checkout()
        # Merge them in
        repository.git.merge('master')
        # Pull any branch changes
        repository.remotes.origin.pull()
        # Push all changes
        repository.remotes.origin.push()
        return {'data': repository_as_json(request, request.matchdict['rid'])}
    raise HTTPNotFound()
