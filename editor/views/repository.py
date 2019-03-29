import os.path

from django.conf import settings
from django.contrib.auth.decorators import permission_required
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
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
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
    # Identify the changes
    local_changes = [{'message': commit.message,
                      'author': commit.author.name,
                      'datetime': commit.committed_datetime.strftime('%d %B %Y %H:%M')}
                     for commit in repo.iter_commits('%s@{u}..%s' % (request.user.username,
                                                                     request.user.username))]
    remote_changes = [{'message': commit.message,
                       'author': commit.author.name,
                       'datetime': commit.committed_datetime.strftime('%d %B %Y %H:%M')}
                      for commit in repo.iter_commits('master@{u}..%s@{u}' % request.user.username)]
    master_changes = [{'message': commit.message,
                       'author': commit.author.name,
                       'datetime': commit.committed_datetime.strftime('%d %B %Y %H:%M')}
                      for commit in repo.iter_commits('master..master@{u}')]
    return render(request, 'editor/repository.jinja2', {'repository': repository,
                                                        'local_changes': local_changes,
                                                        'remote_changes': remote_changes,
                                                        'master_changes': master_changes})
