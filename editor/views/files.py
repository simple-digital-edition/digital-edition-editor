import hashlib
import os.path

from django.conf import settings
from django.contrib.auth.decorators import permission_required
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.translation import gettext as _
from git import Repo, Actor

from ..models import Repository


def list_to_tree(lst, hash):
    if lst:
        if len(lst) == 1:
            return {
                'label': lst[0],
                'id': hash
            }
        else:
            return {
                'label': lst[0],
                'children': [list_to_tree(lst[1:], hash)]
            }
    else:
        return None


def merge_trees(base, merge):
    found = False
    for node in base['children']:
        if node['label'] == merge['label']:
            merge_trees(node, merge['children'][0])
            found = True
            break
    if not found:
        base['children'].append(merge)


@permission_required('editor.view_repository')
def listing(request, rid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(repository.local_path, str(request.user.username))
    repo = Repo(base_path)
    tei_files = {
        'label': None,
        'children': []
    }
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                merge_trees(tei_files, list_to_tree(filename.split(os.path.sep), hash.hexdigest()))
    return render(request, 'editor/files.jinja2', {'repository': repository,
                                                   'files': tei_files})


@permission_required('editor.change_repository')
def edit(request, rid, fid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(repository.local_path, str(request.user.username))
    repo = Repo(base_path)
    tei_file = None
    for path, directories, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == fid:
                    tei_file = filename
    commits = repo.iter_commits('--all', max_count=1, since='2.months.ago', paths=tei_file)
    try:
        commit = next(commits)
        last_commit_msg = commit.message.replace('\n', ' ').replace('\'', '\\\'')
    except StopIteration:
        last_commit_msg = _('Updated {filename}'.format(filename=os.path.basename(tei_file)))
    return render(request, 'editor/edit.jinja2', {'repository': repository,
                                                  'filename': os.path.basename(tei_file),
                                                  'fid': fid,
                                                  'last_commit_msg': last_commit_msg})


@permission_required('editor.change_repository')
def raw_tei(request, rid, fid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(repository.local_path, str(request.user.username))
    repo = Repo(base_path)
    tei_file = None
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == fid:
                    file_path = os.path.join(base_path, filename)
                    if request.method == 'PATCH':
                        with open(file_path, 'wb') as out_f:
                            out_f.write(request.body)
                        print(base_path)
                        repo = Repo(base_path)
                        if repo.index.diff(None) or repo.index.diff('HEAD'):
                            if 'HTTP_X_COMMIT_MESSAGE' in request.META:
                                commit_msg = request.META['HTTP_X_COMMIT_MESSAGE'].strip()
                            else:
                                commit_msg = _('Updated %(filename)s' % {'filename': os.path.basename(file_path)})
                            local_commits = list(repo.iter_commits('%s@{u}..%s' % (request.user.username,
                                                                                   request.user.username)))

                            # Ammend the last commit if it has the same commit message as the new one
                            if len(local_commits) > 0 and local_commits[0].message.strip() == commit_msg and \
                                local_commits[0].author.email == request.user.email:
                                repo.index.add([os.path.abspath(file_path)])
                                repo.git.commit('--amend',
                                                '-m %s' % commit_msg,
                                                '--author="%s %s <%s>"' % (request.user.first_name,
                                                                           request.user.last_name,
                                                                           request.user.email))
                            else:
                                repo.index.add([os.path.abspath(file_path)])
                                actor = Actor('%s %s' % (request.user.first_name, request.user.last_name),
                                              request.user.email)
                                repo.index.commit(commit_msg, author=actor, committer=actor)
                        return HttpResponse('')
                    else:
                        with open(file_path) as f_in:
                            return HttpResponse(f_in.read(), content_type='application/tei+xml')
