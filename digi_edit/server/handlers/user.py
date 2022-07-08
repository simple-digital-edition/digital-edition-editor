"""User API handlers."""
import bcrypt
import logging

from secrets import token_hex
from sqlalchemy import select

from .base import JsonApiHandler
from ...models import get_sessionmaker, User


logger = logging.getLogger(__name__)

USER_LOGIN_SCHEMA = {
    'type': {
        'type': 'string',
        'required': True,
        'empty': False,
        'allowed': ['users'],
    },
    'attributes': {
        'type': 'dict',
        'required': True,
        'empty': False,
        'schema': {
            'email': {
                'type': 'string',
                'required': True,
                'empty': False,
            },
            'password': {
                'type': 'string',
                'required': True,
                'empty': False,
            }
        }
    }
}


class UserLoginHandler(JsonApiHandler):
    """Request handler for logging in a user."""

    async def check_authorised(self: 'UserLoginHandler') -> None:
        """No need to check authorisation when logging in."""
        pass

    async def post(self: 'UserLoginHandler') -> None:
        """Handle the user login."""
        try:
            obj = self.request_body(USER_LOGIN_SCHEMA)
            async with get_sessionmaker()() as dbsession:
                query = select(User).filter(User.email == obj['attributes']['email'])
                result = await dbsession.execute(query)
                user = result.scalar()
                if user and bcrypt.checkpw(obj['attributes']['password'].encode('utf-8'),
                                           user.password.encode('utf-8')):
                    user.attributes['token'] = token_hex(128)
                    dbsession.add(user)
                    await dbsession.commit()
                    self.send_jsonapi({
                        'type': 'user',
                        'id': user.id,
                        'attributes': {
                            'email': user.email,
                            'name': user.attributes['name'],
                            'token': user.attributes['token'],
                        }
                    })
                else:
                    pass
        except Exception as e:
            logger.error(e)
