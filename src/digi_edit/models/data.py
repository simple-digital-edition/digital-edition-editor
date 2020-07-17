import os

from git import Repo, Actor

from digi_edit.jsonapi import jsonapi_type_schema
from digi_edit.util import get_config_setting


class Data(object):
    """The :class:`~digi_edit.models.data.Data` manages the text-data content for a single
    :class:`~digi_edit.models.file.File`.
    """

    def __init__(self, id, branch_id, filepath):
        self._id = id
        self._branch_id = branch_id
        self._filepath = filepath

    def as_jsonapi(self, request):
        """Returns the :class:`~digi_edit.models.data.Data` in JSONAPI representation.

        :params request: The request to use for settings access
        :type request: :class:`~pyramid.requests.Request`
        """
        with open(self._filepath) as in_f:
            textData = in_f.read()
        return {
            'type': 'data',
            'id': self._id,
            'attributes': {
                'data': textData,
            },
            'relationships': {}
        }

    @classmethod
    def patch_schema(cls):
        """Returns the schema that PATCH requests are checked against."""
        return {
            'type': jsonapi_type_schema('data'),
            'attributes': {
                'type': 'dict',
                'schema': {
                    'data': {'type': 'string', 'required': True},
                },
                'required': True,
            },
            'relationships': {
                'type': 'dict',
                'schema': {}
            }
        }

    def patch(self, request, obj, user):
        """Patch the :class:`~digi_Edit.models.data.Data` with new content.

        :params request: The request to use for settings access
        :type request: :class:`~pyramid.requests.Request`
        :param obj: The new data
        :type obj: ``dict``
        :param user: The user performing the update
        :type user: :class:`~digi_edit.models.user.User`
        """
        with open(self._filepath, 'w') as out_f:
            out_f.write(obj['attributes']['data'])
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{self._branch_id}')
        repo = Repo(base_path)
        if repo.index.diff(None) or repo.index.diff('HEAD'):
            repo.index.add([self._filepath])
            actor = Actor(user.attributes['name'], user.email)
            repo.index.commit(f'Updated {os.path.basename(self._filepath)}', author=actor, committer=actor)
            repo.git.push('--set-upstream', 'origin', f'branch-{self._branch_id}', '--force')
