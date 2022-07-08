"""Admin functionality."""
import asyncio
import click

from ..models import get_engine, Base


async def setup_database(drop_existing: bool) -> None:
    """Create the database tables."""
    engine = get_engine()
    async with engine.begin() as conn:
        if drop_existing:
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


@click.command()
@click.option('--drop-existing', is_flag=True, default=False, help='Whether to remove any existing database content')
def setup(drop_existing: bool) -> None:
    """Run the application setup."""
    asyncio.run(setup_database(drop_existing))


@click.group()
def admin() -> None:
    """Administer the Digital Edition Editor."""
    pass


admin.add_command(setup)
