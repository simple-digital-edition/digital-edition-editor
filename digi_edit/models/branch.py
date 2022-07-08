"""The :class:`~digi_edit.models.branch.Branch` represents a single branch."""

from .meta import Base

from sqlalchemy import (Column, Integer)
from sqlalchemy_json import NestedMutableJson


class Branch(Base):
    """The :class:`~digi_edit.models.branch.Branch` represents a single branch."""

    __tablename__ = 'branches'

    id = Column(Integer, primary_key=True)
    attributes = Column(NestedMutableJson)
