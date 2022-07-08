"""User model."""
from datetime import datetime
from sqlalchemy import Column, Integer, Unicode, DateTime
from sqlalchemy_json import NestedMutableJson

from .meta import Base


class User(Base):
    """The :class:`~digi_edit.models.User` represents a single user."""

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(Unicode(191), unique=True)
    password = Column(Unicode(255))
    status = Column(Unicode(255))
    groups = Column(NestedMutableJson)
    permissions = Column(NestedMutableJson)
    attributes = Column(NestedMutableJson)
    created = Column(DateTime, default=datetime.now)
