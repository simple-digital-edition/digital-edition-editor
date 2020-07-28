import os

from collections import OrderedDict
from copy import deepcopy
from datetime import datetime
from git import Repo, Actor
from github import Github
from pyramid.decorator import reify
from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
from shutil import rmtree
from sqlalchemy import (Column, Index, Integer, Unicode, DateTime, ForeignKey, func)
from sqlalchemy.orm import relationship
from sqlalchemy_json import NestedMutableJson

from .meta import Base
from digi_edit.jsonapi import jsonapi_type_schema, jsonapi_id_schema
from digi_edit.util import get_config_setting, get_files_for_branch, get_file_identifier


class File(Base):
    """The :class:`~digi_edit.models.file.File` represents a single file that can be edited.
    """
    __tablename__ = 'files'

    id = Column(Integer, primary_key=True)
    branch_id = Column(Integer, ForeignKey('branches.id'))
    attributes = Column(NestedMutableJson)
    position = Column(Integer)

    branch = relationship('Branch')

    def as_jsonapi(self, request):
        """Return the :class:`~digi_edit.models.file.File` in JSONAPI representation. If the ``'X-Include-Data'`` header
        is set to ``'true'``, then the raw file content is also included."""
        data = {'type': 'files',
                'id': str(self.id),
                'attributes': {'filename': self.attributes['filename'],
                               'path': self.attributes['path'],
                               'name': self.attributes['name'],
                               'mode': self.attributes['mode']},
                'relationships': {}}
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true':
            base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.branch_id}')
            if (self.attributes['path'] == '/'):
                file_path = os.path.join(base_path, self.attributes['name'])
            else:
                file_path = os.path.join(base_path, self.attributes['path'], self.attributes['name'])
            file_path = os.path.abspath(file_path)
            if file_path.startswith(base_path):
                with open(file_path) as in_f:
                    data['attributes']['rawData'] = in_f.read()
            else:
                raise HTTPNotFound()
        return data

    @classmethod
    def patch_schema(cls, request):
        """Creates the schema for validating PATCH requests. If the ``'X-Include-Data'`` header
        is set to ``'true'``, then the raw file content is also allowed."""
        schema = {
            'type': jsonapi_type_schema('files'),
            'id': jsonapi_id_schema(),
            'attributes': {
                'type': 'dict',
                'schema': {
                    'filename': {'type': 'string', 'required': True, 'empty': False},
                    'path': {'type': 'string', 'required': True, 'empty': False},
                    'name': {'type': 'string', 'required': True, 'empty': False},
                    'mode': {'type': 'string', 'required': True, 'empty': False, 'allowed': ['text', 'tei']},
                }
            },
            'relationships': {'type': 'dict', 'schema': {}}
        }
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true':
            schema['attributes']['schema']['rawData'] = {'type': 'string', 'required': True, 'empty': False}
        return schema

    def pre_patch(self, request, user):
        """Write to disk before updating the database. If the ``'X-Include-Data'`` header is set to ``'true'``, then
        the raw file content is written to the disk and if necessary a commit created and pushed to the remote."""
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true' \
            and 'rawData' in self.attributes:
            base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self.branch_id}')
            if (self.attributes['path'] == '/'):
                file_path = os.path.join(base_path, self.attributes['name'])
            else:
                file_path = os.path.join(base_path, self.attributes['path'], self.attributes['name'])
            file_path = os.path.abspath(file_path)
            if file_path.startswith(base_path):
                with open(file_path, 'w') as out_f:
                    out_f.write(self.attributes['rawData'])
                repo = Repo(base_path)
                if repo.index.diff(None) or repo.index.diff('HEAD'):
                    repo.index.add([file_path])
                    actor = Actor(user.attributes['name'], user.email)
                    repo.index.commit(f'Updated {self.attributes["name"]}', author=actor, committer=actor)
                    repo.git.push('--set-upstream', 'origin', f'branch-{self.branch_id}', '--force')
            else:
                raise HTTPNotFound()
        if 'rawData' in self.attributes:
            del self.attributes['rawData']
