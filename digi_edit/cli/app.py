"""Application functionality."""
import click

from ..server import run_application_server


@click.command()
def server() -> None:
    """Run the frontend server."""
    run_application_server()


@click.group()
def app() -> None:
    """Run the Digital Edition Editor applications."""
    pass


app.add_command(server)
