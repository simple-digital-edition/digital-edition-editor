import click

from ..models.meta import Base
from ..models import get_engine


@click.command()
@click.option('--drop-existing', is_flag=True, default=False, help='Drop the existing tables first')
@click.pass_context
def init_db(ctx, drop_existing):
    """Initialise the database structure"""
    engine = get_engine(ctx.obj['settings'])
    if drop_existing:
        Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
