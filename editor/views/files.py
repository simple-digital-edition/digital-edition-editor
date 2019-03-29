import hashlib
import os.path

from django.conf import settings
from django.contrib.auth.decorators import permission_required
from django.shortcuts import render
from git import Repo

from ..models import Repository


@permission_required('editor.repository.can_read')
def listing(request, rid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
    repo = Repo(base_path)
    tei_files = {}
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                tei_files[hash.hexdigest()] = filename
    return render(request, 'editor/files.jinja2', {'repository': repository,
                                                   'files': tei_files})

@permission_required('editor.repository.can_read')
def edit(request, rid, fid):
    repository = Repository.objects.get(pk=rid)
    base_path = os.path.join(settings.REPOSITORY_BASE, str(rid), str(request.user.username))
    repo = Repo(base_path)
    tei_file = None
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if path[len(base_path) + 1:].startswith('content') and filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == fid:
                    tei_file = filename
    return render(request, 'editor/edit.jinja2', {'repository': repository,
                                                  'filename': os.path.basename(tei_file)})
