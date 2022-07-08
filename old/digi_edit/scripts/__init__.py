import click
import os

from pyramid.paster import get_appsettings, setup_logging

from . import config, db, admin


@click.group()
@click.option('-c', '--config', default='production.ini')
@click.pass_context
def main(ctx, config):
    """Administration utility for the Digital Edition Editor"""
    try:
        setup_logging(config)
        settings = get_appsettings(config)
        ctx.obj = {'settings': settings}
    except FileNotFoundError:
        pass


main.add_command(config.create_config)
main.add_command(db.init_db)
main.add_command(admin.add_user)
main.add_command(admin.delete_user)
