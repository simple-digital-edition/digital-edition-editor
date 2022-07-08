import click
import transaction

from hashlib import sha512
from secrets import token_hex

from ..models import get_engine, get_session_factory, get_tm_session, User


@click.command()
@click.pass_context
@click.option('--email', prompt=True)
@click.option('--name', prompt=True)
@click.password_option()
def add_user(ctx, email, name, password):
    """Add a user to the system"""
    with transaction.manager:
        engine = get_engine(ctx.obj['settings'])
        session_factory = get_session_factory(engine)
        dbsession = get_tm_session(session_factory, transaction.manager)
        user = dbsession.query(User).filter(User.email == email).first()
        if user:
            click.echo(click.style('A user with this e-mail address already exists', fg='red'))
        else:
            user = User(email=email,
                        status='active',
                        groups=[],
                        permissions=[],
                        attributes={'name': name})
            user.salt = token_hex(32)
            hash = sha512()
            hash.update(user.salt.encode('utf-8'))
            hash.update(b'$$')
            hash.update(password.encode('utf-8'))
            user.password = hash.hexdigest()
            user.status = 'active'
            dbsession.add(user)
            click.echo(click.style('User created', fg='green'))


@click.command()
@click.pass_context
@click.option('--email', prompt=True)
@click.confirmation_option(prompt='Please confirm you wish to delete this user')
def delete_user(ctx, email):
    """Delete a user from the system"""
    with transaction.manager:
        engine = get_engine(ctx.obj['settings'])
        session_factory = get_session_factory(engine)
        dbsession = get_tm_session(session_factory, transaction.manager)
        user = dbsession.query(User).filter(User.email == email).first()
        if user:
            dbsession.delete(user)
            click.echo(click.style('User deleted', fg='green'))
        else:
            click.echo(click.style('No user with that e-mail address exists', fg='red'))
