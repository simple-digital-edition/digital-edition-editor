"""Command-line interface."""
import click
import logging
import logging.config
import yaml
import os

from cerberus import Validator
from typing import Union

from .admin import admin
from ..utils import set_config


CONFIG_SCHEMA = {
    'database': {
        'type': 'dict',
        'schema': {
            'dsn': {
                'type': 'string',
                'default': 'sqlite+aiosqlite:////var/lib/digi-edit/digi-edit.sqlite'
            },
        },
        'default': {
            'dsn': 'sqlite+aiosqlite:////var/lib/digi-edit/digi-edit.sqlite'
        }
    },
}


def validate_config(config: dict) -> dict:
    """Validate the configuration.

    :param config: The configuration to validate
    :type config: dict
    :return: The validated and normalised configuration
    :rtype: dict
    """
    validator = Validator(CONFIG_SCHEMA)
    if validator.validate(config):
        return validator.normalized(config)
    else:
        error_list = []

        def walk_error_tree(err: Union[dict, list], path: str) -> None:
            if isinstance(err, dict):
                for key, value in err.items():
                    walk_error_tree(value, path + (str(key), ))
            elif isinstance(err, list):
                for sub_err in err:
                    walk_error_tree(sub_err, path)
            else:
                error_list.append(f'{".".join(path)}: {err}')

        walk_error_tree(validator.errors, ())
        error_str = '\n'.join(error_list)
        raise click.ClickException(f'Configuration errors:\n\n{error_str}')


@click.group()
def main() -> None:
    """Run the Digital Edition Editor application."""
    config = None
    if os.path.exists('config.yaml'):
        with open('config.yaml') as in_f:
            config = yaml.safe_load(in_f)
    elif os.path.exists('/etc/digi-edit/config.yaml'):
        with open('/etc/digi-edit/config.yaml') as in_f:
            config = yaml.safe_load(in_f)
    if not config:
        raise click.ClickException('No configuration found (./config.yaml, /etc/digi-edit/config.yaml)')
    normalised = validate_config(config)
    set_config(normalised)
    if 'logging' in normalised:
        logging.config.dictConfig(normalised['logging'])


main.add_command(admin)
