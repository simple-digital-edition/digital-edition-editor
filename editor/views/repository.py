import os.path
import requests

from django.conf import settings
from django.contrib.auth.decorators import permission_required
from django.http import HttpResponse
from django.shortcuts import render
from git import Repo

from ..models import Repository


@permission_required('editor.repository.can_read')
def index(request):
    ctx = {
        'repositories': Repository.objects.all()
    }
    return render(request, 'editor/index.jinja2', ctx)


@permission_required('editor.repository.can_read')
def repository(request, rid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(repository.local_path, str(request.user.username))
    # Clone or load the repository
    if not os.path.exists(base_path):
        repo = Repo.clone_from(repository.url, base_path)
        # Ensure local and remote user branch exist
        if request.user.username in repo.remotes.origin.refs:
            branch = repo.create_head(request.user.username)
            branch.set_tracking_branch(repo.remotes.origin.refs[request.user.username])
            branch.checkout()
        else:
            branch = repo.create_head(request.user.username)
            branch.checkout()
        repo.git.push('--set-upstream', 'origin', request.user.username)
    else:
        repo = Repo(base_path)
        # Fetch remote change information
        repo.remotes.origin.fetch()
        repo.git.push('--set-upstream', 'origin', request.user.username)
    # Identify the changes
    remote_changes = [{'message': commit.message,
                       'author': commit.author.name,
                       'datetime': commit.committed_datetime.strftime('%d %B %Y %H:%M')}
                      for commit in repo.iter_commits('master@{u}..%s@{u}' % request.user.username)]
    master_changes = [{'message': commit.message,
                       'author': commit.author.name,
                       'datetime': commit.committed_datetime.strftime('%d %B %Y %H:%M')}
                      for commit in repo.iter_commits('%s..master@{u}' % request.user.username)]
    return render(request, 'editor/repository.jinja2', {'repository': repository,
                                                        'remote_changes': remote_changes,
                                                        'master_changes': master_changes})


@permission_required('editor.repository.can_read')
def pull_request(request, rid):
    if request.method == 'POST':
        repository = Repository.objects.get(pk=rid)
        response = requests.post('%s/merge_requests' % repository.gitlab_api,
                                 headers={'PRIVATE-TOKEN': repository.gitlab_api_token},
                                 params={'source_branch': request.user.username,
                                         'target_branch': 'master',
                                         'title': 'TEI Editor Changes'})
        if response.status_code >= 200 and response.status_code < 300:
            return HttpResponse('', status=200)
        else:
            return HttpResponse('', status=500)


@permission_required('editor.repository.can_read')
def local_merge(request, rid):
    if request.method == 'POST':
        repository = Repository.objects.get(pk=rid)
        base_path = os.path.join(repository.local_path, str(request.user.username))
        repository = Repo(base_path)
        # Pull the latest changes from the master branch
        repository.heads.master.checkout()
        repository.remotes.origin.pull()
        repository.heads[request.user.username].checkout()
        # Merge them in
        repository.git.merge('master')
        # Pull any branch changes
        repository.remotes.origin.pull()
        # Push all changes
        repository.remotes.origin.push()
        return HttpResponse('', status=200)
