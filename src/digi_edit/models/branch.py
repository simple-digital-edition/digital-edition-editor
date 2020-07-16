import os

from collections import OrderedDict
from datetime import datetime
from git import Repo
from hashlib import sha256
from pyramid.decorator import reify
from shutil import rmtree
from sqlalchemy import (Column, Index, Integer, Unicode, DateTime)
from sqlalchemy.orm import relationship
from sqlalchemy_json import NestedMutableJson

from .meta import Base
from digi_edit.util import jsonapi_type_schema, get_config_setting


class Branch(Base):
    """The :class:`~digi_edit.models.branch.Branch` represents a single branch."""

    __tablename__ = 'branches'

    id = Column(Integer, primary_key=True)
    attributes = Column(NestedMutableJson)

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
            'attributes': self.attributes}
        repo = Repo(base_path)
        files = []
        for basepath, _, filenames in os.walk(base_path):
            if not basepath.endswith('.git') and '/.git/' not in basepath:
                for filename in filenames:
                    files.append(os.path.join(basepath, filename))
        files.sort()
        files = list(map(lambda fn: {'type': 'files',
                                     'id': sha256((str(self.id) + '$$' + fn).encode('utf-8')).hexdigest()}, files))
        data['relationships'] = {'files': {'data': files}}
        last_commit = next(repo.iter_commits())
        if last_commit:
            data['attributes']['updated'] = last_commit.committed_datetime.isoformat()
        return data

    @classmethod
    def create_schema(cls):
        """Return the validation schema for creating a new instance."""
        return {
            'type': jsonapi_type_schema('branches'),
            'attributes': {'type': 'dict',
                           'schema': {'name': {'type': 'string',
                                               'required': True,
                                               'empty': False}}}
        }

    def pre_create(self, request):
        """Before creation set the creation date."""
        self.attributes['created'] = datetime.utcnow().isoformat()

    def post_create(self, request):
        """After creation clone the repository, checkout the new branch, and push that to the remote repository."""
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        repo = Repo.clone_from(get_config_setting(request, 'git.url'), base_path)
        branch = repo.create_head(f'branch-{self.id}')
        branch.checkout()
        repo.git.push('--set-upstream', 'origin', f'branch-{self.id}', '--force')

    def pre_delete(self, request):
        """Delete the remote branch and the local directory."""
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.id}')
        repo = Repo(base_path)
        repo.git.push('origin', '--delete', f'branch-{self.id}')
        rmtree(base_path)
