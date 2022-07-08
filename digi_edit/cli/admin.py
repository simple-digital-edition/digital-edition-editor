"""Admin functionality."""
import click


@click.command()
def setup():
    pass


@click.group()
def admin():
    pass


admin.add_command(setup)
