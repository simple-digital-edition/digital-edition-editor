"""Static JSON file handlers."""
import json
import logging
import os
import yaml

from typing import List

from .base import ProtectedHandler


logger = logging.getLogger(__name__)


class JsonStaticHandler(ProtectedHandler):
    """Handle requests for static JSON files."""

    def initialize(self: 'JsonStaticHandler', path: str = '') -> None:
        """Initialise with the base path to load data from."""
        logger.debug(f'Static JSON handler set up for {path}')
        self._base_path = path

    def get(self: 'JsonStaticHandler', path: List[str]) -> None:
        """Fetch a static JSON file.

        This file can also be in YAML format, in which case it is first converted into JSON before sending.
        """
        item_path = os.path.join(self._base_path, path)
        logger.debug(f'Sending static JSON {item_path}')
        if item_path.startswith(self._base_path):
            if os.path.exists(item_path):
                with open(item_path) as in_f:
                    if item_path.endswith('.json'):
                        config = json.load(in_f)
                    elif item_path.endswith('.yaml'):
                        config = yaml.safe_load(in_f)
                    else:
                        config = {}
                    self.write(config)
        else:
            self.send_error(status_code=404)
