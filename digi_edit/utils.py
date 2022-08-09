"""Utility functions."""
import asyncio
import logging

from typing import List, Any, Union


_config = {}
logger = logging.getLogger(__name__)


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


async def run_git_command(*cmd: List[Any], **kwargs: dict) -> Union[None, asyncio.subprocess.Process]:
    """Run a git command."""
    logger.debug(f'Running git {" ".join(cmd)}')
    process = await asyncio.create_subprocess_exec('git', *cmd, **kwargs)
    if 'stdout' in kwargs or 'stderr' in kwargs:
        return process
    else:
        await process.wait()
