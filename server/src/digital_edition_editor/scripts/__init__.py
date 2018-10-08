"""
############################################################
:mod:`digital_edition_editor.scripts` - Command-line Scripts
############################################################

Scripts to administer the application from the command-line.
"""
import click

from .config import create_config


@click.group()
@click.option('--configuration', '-c', default='production.ini', help='Configuration file to use')
def main(configuration):
    """Digital Edition Editor maintenance"""
    pass


main.add_command(create_config)
