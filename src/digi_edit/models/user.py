from collections import OrderedDict
from datetime import datetime
from pyramid.decorator import reify
from sqlalchemy import (Column, Index, Integer, Unicode, DateTime)
from sqlalchemy.orm import relationship
from sqlalchemy_json import NestedMutableJson

from .meta import Base


PERMISSIONS = OrderedDict()
GROUPS = OrderedDict()


class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(Unicode(191))
    salt = Column(Unicode(255))
    password = Column(Unicode(255))
    status = Column(Unicode(255))
    groups = Column(NestedMutableJson)
    permissions = Column(NestedMutableJson)
    attributes = Column(NestedMutableJson)
    created = Column(DateTime, default=datetime.now)

    def allow(self, user, action):
        """Check whether the given user is allowed to undertake the given action.

        :param user: The user to check for
        :type user: :class:`~toja.models.user.User`
        :param action: The action to check (view, edit, delete)
        :type action: ``str``
        """
        return True

    def has_permission(self, permission, include_groups=True):
        if include_groups:
            return permission in self.full_permissions
        else:
            return permission in self.permissions

    @reify
    def full_permissions(self):
        return self.permissions + [perm for group, permissions in GROUPS.items()
                                   if group in self.groups for perm in permissions]

    def as_jsonapi(self, request):
        return {
            'type': 'users',
            'id': str(self.id),
            'attributes': {
                'email': self.email,
                'token': self.attributes['token'] if 'token' in self.attributes else '',
            }}


Index('users_email_ix', User.email, unique=True, mysql_length=191)
