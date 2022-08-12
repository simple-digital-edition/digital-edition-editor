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
                query = select(User).filter(User.email == obj['attributes']['email'].lower())
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


PATCH_USER_SCHEMA = {
    'type': {
        'type': 'string',
        'empty': False,
        'allowed': ['users'],
    },
    'id': {
        'type': 'string',
        'empty': False
    },
    'attributes': {
        'type': 'dict',
        'schema': {
            'name': {
                'type': 'string'
            },
            'email': {
                'type': 'string'
            },
            'password': {
                'type': 'string'
            }
        }
    }
}


class UserItemHandler(JsonApiHandler):
    """Handle requests for individual users."""

    async def get(self: 'UserItemHandler', user_id: str) -> None:
        """Get the currently authenticated user."""
        user = await self.get_authorised_user()
        if user:
            self.send_jsonapi({
                'type': 'user',
                'id': str(user.id),
                'attributes': {
                    'email': user.email,
                    'name': user.attributes['name'],
                    'token': user.attributes['token'],
                }
            })
        else:
            self.set_status(401)

    async def patch(self: 'UserItemHandler', user_id: str) -> None:
        """Patch the currently authenticated user."""
        user = await self.get_authorised_user()
        if user:
            body = self.request_body(PATCH_USER_SCHEMA)
            async with get_sessionmaker()() as dbsession:
                dbsession.add(user)
                if 'name' in body['attributes']:
                    user.attributes['name'] = body['attributes']['name']
                elif 'email' in body['attributes']:
                    user.email = body['attributes']['email']
                elif 'password' in body['attributes']:
                    user.password = bcrypt.hashpw(body['attributes']['password'].encode('utf-8'),
                                                  bcrypt.gensalt()).decode()
                await dbsession.commit()
            self.send_jsonapi({
                'type': 'user',
                'id': str(user.id),
                'attributes': {
                    'email': user.email,
                    'name': user.attributes['name'],
                    'token': user.attributes['token'],
                }
            })
        else:
            self.set_status(404)
