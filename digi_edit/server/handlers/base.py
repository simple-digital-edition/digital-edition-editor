"""Base handler classes."""
import json
import logging

from cerberus import Validator
from sqlalchemy import select
from tornado.web import RequestHandler
from typing import Union, List

from ...models import get_sessionmaker, User


logger = logging.getLogger(__name__)


class JsonApiException(Exception):
    """Exception used for passing JsonApi-formatted exceptions."""

    pass


class ProtectedHandler(RequestHandler):
    """RequestHandler that ensures request are authorised."""

    async def get_authorised_user(self: 'JsonApiHandler') -> Union[None, User]:
        """Return the authorised user."""
        try:
            if 'Authorization' in self.request.headers:
                auth_header = self.request.headers['Authorization']
                if auth_header.startswith('Bearer '):
                    logger.debug('Bearer token passed')
                    auth_header = auth_header[7:]
                    if ' ' in auth_header:
                        logger.debug('Bearer token format ok')
                        user_id, token = auth_header.split(' ')
                        async with get_sessionmaker()() as dbsession:
                            query = select(User).filter(User.id == int(user_id))
                            result = await dbsession.execute(query)
                            user = result.scalar()
                            if user and 'token' in user.attributes and user.attributes['token'] == token:
                                return user
        except Exception:
            pass
        return None

    async def check_authorised(self: 'JsonApiHandler') -> None:
        """Check whether the user is authorised to access the system."""
        if await self.get_authorised_user() is None:
            self.send_error(status_code=401)

    async def prepare(self: 'JsonApiHandler') -> None:
        """Check authorisation for all requests."""
        await self.check_authorised()


class JsonApiHandler(ProtectedHandler):
    """RequestHandler subclass that provides utility methods for dealing with JsonApi data."""

    def request_body(self: 'JsonApiHandler', schema: dict) -> Union[dict, List[dict]]:
        """Extract the request body and validate it against the ``schema``."""
        try:
            body = json.loads(self.request.body)
            validator = Validator({'data': {'type': 'dict',
                                            'required': True,
                                            'schema': schema}})
            if validator.validate(body):
                return validator.normalized(body)['data']
            logger.error(validator.errors)
            raise JsonApiException()
        except Exception as e:
            logger.error(e)
            raise JsonApiException()

    def send_jsonapi(self: 'JsonApiHandler', obj: Union[dict, List[dict]]) -> None:
        """Send a JsonApi formatted response."""
        self.write({'data': obj})
