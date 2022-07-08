"""Admin functionality."""
import asyncio
import bcrypt
import click

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from ..models import get_engine, get_sessionmaker, Base, User


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


async def add_user_to_database(email: str, name: str, password: str) -> None:
    """Add a user to the database."""
    try:
        async with get_sessionmaker()() as dbsession:
            user = User(email=email,
                        password=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode(),
                        status='active',
                        groups=[],
                        permissions=[],
                        attributes={'name': name})
            dbsession.add(user)
            await dbsession.commit()
    except IntegrityError:
        click.echo(click.style(f'A user with the e-mail address {email} already exists in the database', fg='red'))


@click.command()
@click.option('--email', prompt=True, help='Email of the user')
@click.option('--name', prompt=True, help='Name of the user')
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True, help='Password for the user')
def add_user(email: str, name: str, password: str) -> None:
    """Add a user to the editor."""
    asyncio.run(add_user_to_database(email, name, password))


async def delete_user_from_database(email: str) -> None:
    """Delete a user from the database."""
    async with get_sessionmaker()() as dbsession:
        query = select(User).filter(User.email == email)
        result = await dbsession.execute(query)
        user = result.scalar()
        if user:
            await dbsession.delete(user)
            await dbsession.commit()


@click.command()
@click.option('--email', prompt=True, confirmation_prompt=True, help='Email of the user')
def delete_user(email: str) -> None:
    """Delete a user from the editor."""
    asyncio.run(delete_user_from_database(email))


@click.group()
def admin() -> None:
    """Administer the Digital Edition Editor."""
    pass


admin.add_command(setup)
admin.add_command(add_user)
admin.add_command(delete_user)
