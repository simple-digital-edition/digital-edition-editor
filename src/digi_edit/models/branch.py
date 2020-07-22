import os

from collections import OrderedDict
from copy import deepcopy
from datetime import datetime
from git import Repo
from github import Github
from gitlab import Gitlab
from pyramid.decorator import reify
from shutil import rmtree
from sqlalchemy import (Column, Index, Integer, Unicode, DateTime, func)
from sqlalchemy.orm import relationship
from sqlalchemy_json import NestedMutableJson

from .meta import Base
from .file import File
from digi_edit.jsonapi import jsonapi_type_schema
from digi_edit.util import get_config_setting, get_files_for_branch, get_file_identifier


class Branch(Base):
    """The :class:`~digi_edit.models.branch.Branch` represents a single branch."""

    __tablename__ = 'branches'

    id = Column(Integer, primary_key=True)
    attributes = Column(NestedMutableJson)

    files = relationship('File', cascade="all, delete-orphan")

    def allow(self, user, action):
        """Check whether the given user is allowed to undertake the given action.

        :param user: The user to check for
        :type user: :class:`~toja.models.user.User`
        :param action: The action to check (view, edit, delete)
        :type action: ``str``
        """
        return True

    def as_jsonapi(self, request):
        """Return this :class:`~digi_edit.models.branch.Branch` in JSONAPI format."""
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        data = {
            'type': 'branches',
            'id': str(self.id),
            'attributes': {},
            'relationships': {}}
        for key, value in self.attributes.items():
            data['attributes'][key] = value
        if self.attributes['status'] == 'active':
            # Find all editable files of this branch
            data['relationships']['files'] = {'data': [{'type': 'files',
                                                        'id': str(file.id)} for file in self.files]}
            # Get the repository information
            repo = Repo(base_path)
            last_commit = next(repo.iter_commits())
            if last_commit and ('updated' not in data['attributes']
                                or data['attributes']['updated'] != last_commit.committed_datetime.isoformat()):
                data['attributes']['updated'] = last_commit.committed_datetime.isoformat()
            data['attributes']['authors'] = []
            first_commit = None
            last_commit = None
            for commit in repo.iter_commits(f'default..branch-{self.id}'):
                if not first_commit:
                    first_commit = commit
                last_commit = commit
                data['attributes']['authors'].append(commit.author.name)
            if len(list(repo.iter_commits(f'branch-{self.id}..default'))) > 0:
                data['attributes']['updates'] = True
            if last_commit:
                last_commit = last_commit.parents[0]
                changed_files = []
                for diff in first_commit.diff(last_commit):
                    changed_files.append(diff.a_path)
                data['attributes']['changes'] = changed_files
            else:
                data['attributes']['changes'] = []
        return data

    @classmethod
    def create_schema(cls):
        """Return the validation schema for creating a new instance."""
        return {
            'type': jsonapi_type_schema('branches'),
            'attributes': {'type': 'dict',
                           'schema': {'name': {'type': 'string',
                                               'required': True,
                                               'empty': False},
                                      'status': {'type': 'string',
                                                 'default': 'active',
                                                 'allowed': ['active', 'merged', 'deleted']}}}
        }

    def pre_create(self, request):
        """Before creation set the creation date."""
        self.attributes['created'] = datetime.utcnow().isoformat()
        self.attributes['pull_request'] = None

    def post_create(self, request):
        """After creation clone the repository, checkout the new branch, and push that to the remote repository."""
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        repo = Repo.clone_from(get_config_setting(request, 'git.url'), base_path)
        branch = repo.create_head(f'branch-{self.id}')
        branch.checkout()
        repo.git.push('--set-upstream', 'origin', f'branch-{self.id}', '--force')
        files = get_files_for_branch(request, self)
        for filename in files:
            local_path = filename[len(os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')) + 1:]
            path, name = os.path.split(local_path)
            if path == '':
                path = '/'
            self.files.append(File(attributes={'filename': filename,
                                               'path': path,
                                               'name': name}))
        request.dbsession.flush()


    def pre_delete(self, request):
        """Delete the remote branch and the local directory."""
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        repo = Repo(base_path)
        repo.git.push('origin', '--delete', f'branch-{self.id}')
        rmtree(base_path)
        self.files = []
        self.attributes['deleted'] = datetime.now().isoformat()

    def action(self, request, action):
        if action == 'request-integration':
            self.request_integration(request)
        elif action == 'cancel-integration':
            self.cancel_integration(request)
        elif action == 'rebase':
            self.rebase(request)

    def request_integration(self, request):
        integration = get_config_setting(request, 'git.integration')
        if integration == 'github':
            gh = Github(get_config_setting(request, 'github.token'))
            gh_repo = gh.get_repo('scmmmh/DigiEditTest')
            if self.attributes['pull_request']:
                pull_request = gh_repo.get_pull(self.attributes['pull_request']['id'])
                pull_request.edit(state='open')
            else:
                gh_repo.create_pull(title=f'Integrate {self.attributes["name"]}', body='', base='default', head=f'branch-{self.id}')
        elif integration == 'gitlab':
            gl = Gitlab(get_config_setting(request, 'gitlab.host'), get_config_setting(request, 'gitlab.token'))
            gl_repo = gl.projects.get(get_config_setting(request, 'gitlab.projectid'))
            if self.attributes['pull_request']:
                merge_request = gl_repo.mergerequests.get(self.attributes['pull_request']['id'])
                merge_request.state_event = 'reopen'
                merge_request.save()
            else:
                gl_repo.mergerequests.create({'source_branch': f'branch-{self.id}',
                                              'target_branch': 'default',
                                              'title': f'Integrate {self.attributes["name"]}'})

    def cancel_integration(self, request):
        integration = get_config_setting(request, 'git.integration')
        if integration == 'github':
            if self.attributes['pull_request']['state'] == 'open':
                gh = Github(get_config_setting(request, 'github.token'))
                gh_repo = gh.get_repo('scmmmh/DigiEditTest')
                pull_request = gh_repo.get_pull(self.attributes['pull_request']['id'])
                pull_request.edit(state='closed')

    def rebase(self, request):
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        repo = Repo(base_path)
        repo.git.rebase('default')
        repo.git.push('origin', f'branch-{self.id}', '--force')
