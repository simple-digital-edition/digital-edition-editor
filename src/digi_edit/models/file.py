import os

from collections import OrderedDict
from copy import deepcopy
from datetime import datetime
from git import Repo, Actor
from github import Github
from pyramid.decorator import reify
from pyramid.httpexceptions import HTTPClientError, HTTPNotFound
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
                'relationships': {
                    'branch': {
                        'data': {
                            'type': 'branches',
                            'id': str(self.branch.id)
                        }
                    }
                }}
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true':
            base_path = os.path.join(get_config_setting(request, 'git.dir'), self.branch.branch_name(request))
            if (self.attributes['path'] == '/'):
                file_path = os.path.join(base_path, self.attributes['name'])
            else:
                file_path = os.path.join(base_path, self.attributes['path'], self.attributes['name'])
            file_path = os.path.abspath(file_path)
            if file_path.startswith(base_path) and os.path.exists(file_path):
                with open(file_path) as in_f:
                    data['attributes']['rawData'] = in_f.read()
            else:
                raise HTTPNotFound()
        return data

    @classmethod
    def create_schema(cls):
        """Creates the schema for validating POST requests."""
        return {
            'type': jsonapi_type_schema('files'),
            'attributes': {
                'type': 'dict',
                'schema': {
                    'filename': {'type': 'string', 'required': True, 'empty': False},
                    'path': {'type': 'string', 'required': True, 'empty': False},
                    'name': {'type': 'string', 'required': True, 'empty': False}
                }
            },
            'relationships': {
                'type': 'dict',
                'schema': {
                    'branch': {
                        'type': 'dict',
                        'schema': {
                            'data': {
                                'type': 'dict',
                                'schema': {
                                    'type': jsonapi_type_schema('branches'),
                                    'id': jsonapi_id_schema(),
                                }
                            }
                        }
                    }
                }
            }
        }

    def pre_create(self, request, user):
        if self.attributes['filename'].startswith('/'):
            self.attributes['filename'] = self.attributes['filename'][1:]
        self.attributes['filename'] = os.path.join(get_config_setting(request, 'git.dir'),
                                                   self.branch.branch_name(request),
                                                   self.attributes['filename'])
        if os.path.exists(self.attributes['filename']):
            raise HTTPClientError()
        tei_extensions = get_config_setting(request, 'files.tei', target_type='list', default=[])
        self.attributes['mode'] = 'text'
        if '.' in self.attributes['name']:
            ext = self.attributes['name'][self.attributes['name'].rfind('.') + 1:]
            if ext in tei_extensions:
                self.attributes['mode'] = 'tei'
        with open(self.attributes['filename'], 'w') as out_f:
            if self.attributes['mode'] == 'tei':
                print('<?xml version="1.0" encoding="UTF-8"?>', file=out_f)
                print('<tei:TEI xmlns:tei="http://www.tei-c.org/ns/1.0">', file=out_f)
                print('  <tei:teiHeader>', file=out_f)
                print('  </tei:teiHeader>', file=out_f)
                print('  <tei:text>', file=out_f)
                print('  </tei:text>', file=out_f)
                print('</tei:TEI>', file=out_f)
        base_path = os.path.join(get_config_setting(request, 'git.dir'), self.branch.branch_name(request))
        repo = Repo(base_path)
        repo.index.add([self.attributes['filename']])
        actor = Actor(user.attributes['name'], user.email)
        repo.index.commit(f'Added {self.attributes["name"]}', author=actor, committer=actor)
        repo.git.push('--set-upstream', 'origin', self.branch.branch_name(request), '--force')


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
            'relationships': {
                'type': 'dict',
                'schema': {
                    'branch': {
                        'type': 'dict',
                        'schema': {
                            'data': {
                                'type': 'dict',
                                'schema': {
                                    'type': jsonapi_type_schema('branches'),
                                    'id': jsonapi_id_schema(),
                                }
                            }
                        }
                    }
                }
            }
        }
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true':
            schema['attributes']['schema']['rawData'] = {'type': 'string', 'required': True, 'empty': False}
        return schema

    def pre_patch(self, request, user):
        """Write to disk before updating the database. If the ``'X-Include-Data'`` header is set to ``'true'``, then
        the raw file content is written to the disk and if necessary a commit created and pushed to the remote."""
        if 'X-Include-Data' in request.headers and request.headers['X-Include-Data'] == 'true' \
            and 'rawData' in self.attributes:
            base_path = os.path.join(get_config_setting(request, 'git.dir'), self.branch.branch_name(request))
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
                    repo.git.push('--set-upstream', 'origin', self.branch.branch_name(request), '--force')
            else:
                raise HTTPNotFound()
        if 'rawData' in self.attributes:
            del self.attributes['rawData']
