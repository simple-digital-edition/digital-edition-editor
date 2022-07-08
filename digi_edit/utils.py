"""Utility functions."""
import asyncio

from typing import List, Any


_config = {}


def set_config(config: dict) -> None:
    """Set the global configuration."""
    global _config
    _config = config


def config() -> dict:
    """Get the global configuration."""
    return _config


def get_branch_name(id: str) -> str:
    """Get branch name for an ``id``."""
    if config()['git']['branch-prefix']:
        return f'{config()["git"]["branch-prefix"]}-branch-{id}'
    else:
        return f'branch-{id}'


async def run_git_command(*cmd: List[Any], **kwargs: dict) -> None:
    """Run a git command."""
    process = await asyncio.create_subprocess_exec('git', *cmd, **kwargs)
    await process.wait()
