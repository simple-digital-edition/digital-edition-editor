import os

from digi_edit.util import get_config_setting


class File(object):
    """The :class:`~digi_edit.models.file.File` represents a single file that can be edited.
    """

    def __init__(self, id, branch_id, filepath):
        self._id = id
        self._branch_id = branch_id
        self._filepath = filepath

    def as_jsonapi(self, request):
        """Return the :class:`~digi_edit.models.file.File` in JSONAPI representation."""
        path, filename = os.path.split(self._filepath)
        path = path[len(os.path.join(get_config_setting(request, 'git.dir'),
                                     f'branch-{self._branch_id}')) + 1:]
        if not path:
            path = '/'
        return {
            'type': 'files',
            'id': self._id,
            'attributes': {
                'path': path,
                'filename': filename,
            },
            'relationships': {
                'data': {
                    'data': {
                        'type': 'data',
                        'id': self._id
                    }
                }
            }
        }
