"""Handler for the application files."""
import logging

from importlib import resources
from importlib.abc import Traversable
from mimetypes import guess_type
from tornado.web import RequestHandler


logger = logging.getLogger(__name__)


class FrontendHandler(RequestHandler):
    """Handler for the frontend application files."""

    def get(self: 'FrontendHandler', path: str) -> None:
        """Get the file at the given path.

        :param path: The path to get.
        :type: path: str
        """
        self.xsrf_token
        if not path.strip():
            path = '/'
        base = resources.files('digi_edit')
        public = base / 'server' / 'frontend' / 'public'
        try:
            logger.debug(f'Attempting to send {path}')
            self._get_resource(public, path.split('/')[1:])
        except FileNotFoundError:
            logger.debug('Sending index.html')
            self._get_resource(public, ('index.html', ))

    def _get_resource(self: 'FrontendHandler', resource: Traversable, path: list[str]) -> None:
        """Send a file.

        Performs mimetype guessing and sets the appropriate Content-Type header.

        :param resource: The root resource to serve files from
        :type resource: importlib.Traversable
        :param path: The path to the file to send
        :type path: list[str]
        """
        for part in path:
            resource = resource / part
        try:
            data = resource.read_bytes()
            mimetype = guess_type(path[-1])
            if mimetype:
                self.set_header('Content-Type', mimetype[0])
            self.write(data)
        except IsADirectoryError:
            raise FileNotFoundError()
