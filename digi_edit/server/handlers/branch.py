"""Branch API handlers."""
from .base import JsonApiHandler


class BranchCollectionHandler(JsonApiHandler):
    """Handle requests to the collection of branches."""

    async def post(self: 'BranchCollectionHandler') -> None:
        """Handle POST requests creating new branches."""
        pass

    async def get(self: 'BranchCollectionHandler') -> None:
        """Handle GET requests retrieving all branches."""
        pass


class BranchItemHandler(JsonApiHandler):
    """Handle requests to individual branches."""

    pass
