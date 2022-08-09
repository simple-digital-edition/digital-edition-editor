"""Handlers implementing the web application."""

from .frontend import FrontendHandler  # noqa
from .static import JsonStaticHandler  # noqa
from .user import UserLoginHandler  # noqa
from .branch import BranchCollectionHandler, BranchItemHandler  # noqa
from .file import FileCollectionHandler, FileItemHandler # noqa
from .webhooks import GitlabWebhookHandler  # noqa
