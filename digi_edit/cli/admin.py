"""Admin functionality."""
import asyncio
import bcrypt
import click
import logging
import os
import re
import shutil

from git import Repo
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from ..models import get_engine, get_sessionmaker, Base, User, Branch
from ..utils import config


logger = logging.getLogger(__name__)


async def setup_database(drop_existing: bool) -> None:
    """Create the database tables."""
    logger.debug('Setting up the database')
    engine = get_engine()
    async with engine.begin() as conn:
        if drop_existing:
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


async def load_existing_branches() -> None:
    """Import any existing branches."""
    logger.debug('Importing existing branches')
    target_dir = os.path.join(config()['git']['source'], 'base-dir')
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
    process = await asyncio.create_subprocess_exec('git', 'clone', config()['git']['source'], target_dir)
    await process.wait()
    repo = Repo(target_dir)
    remote_refs = repo.remote().refs
    branch_prefix = config()['git']['branch-prefix']
    pattern = f'origin/{branch_prefix}-branch-([0-9]+)' if branch_prefix else 'origin/branch-([0-9]+)'
    async with get_sessionmaker()() as dbsession:
        for refs in remote_refs:
            match = re.match(pattern, refs.name)
            if match:
                query = select(Branch).filter(Branch.id == int(match.group(1)))
                result = await dbsession.execute(query)
                if result.scalar() is None:
                    branch = Branch(id=int(match.group(1)),
                                    attributes={'name': f'Branch {match.group(1)}'})
                    dbsession.add(branch)
                    await dbsession.commit()
                    if branch_prefix:
                        shutil.copytree(target_dir, os.path.join(config()['git']['base-dir'],
                                                                 f'{branch_prefix}-branch-{match.group(1)}'))
                    else:
                        shutil.copytree(target_dir, os.path.join(config()['git']['base-dir'],
                                                                 f'branch-{match.group(1)}'))
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)


@click.command()
@click.option('--drop-existing', is_flag=True, default=False, help='Whether to remove any existing database content')
def setup(drop_existing: bool) -> None:
    """Run the application setup."""
    asyncio.run(setup_database(drop_existing))
    asyncio.run(load_existing_branches())


async def add_user_to_database(email: str, name: str, password: str) -> None:
    """Add a user to the database."""
    try:
        async with get_sessionmaker()() as dbsession:
            user = User(email=email.lower(),
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
