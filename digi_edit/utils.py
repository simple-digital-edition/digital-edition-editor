"""Utility functions."""
_config = {}


def set_config(config: dict) -> None:
    """Set the global configuration."""
    global _config
    _config = config


def config() -> dict:
    """Get the global configuration."""
    return _config
