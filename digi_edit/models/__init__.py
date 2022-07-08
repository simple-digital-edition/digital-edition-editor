"""Functionality for database access."""
import logging
from sqlalchemy.ext.asyncio import AsyncSession, AsyncEngine, create_async_engine
from sqlalchemy.orm import sessionmaker
from typing import Callable

from .meta import Base  # noqa: F401
from .branch import Branch  # noqa: F401
from ..utils import config

logger = logging.getLogger(__name__)
engine = None
session_factory = None


def get_engine() -> AsyncEngine:
    """Get the database engine.

    This returns a singleton instance.

    :return: The database engine as configured by the settings.
    :rtype: :class:`~sqlalchemy.ext.asyncio.AsyncEngine`
    """
    global engine
    if engine is None:
        logger.debug('Creating engine')
        engine = create_async_engine(config()['database']['dsn'])
    return engine


def get_sessionmaker() -> Callable[[], AsyncSession]:
    """Get the sessionmaker.

    This returns a singleton instance.

    :return: A function that creates a new :class:`~sqlalchemy.ext.asyncio.AsyncSession`.
    :rtype: Callable
    """
    global session_factory
    if session_factory is None:
        logger.debug('Creating sessionmaker')
        session_factory = sessionmaker(bind=get_engine(), expire_on_commit=False, class_=AsyncSession)
    return session_factory
