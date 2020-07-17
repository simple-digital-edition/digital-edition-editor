import os

from hashlib import sha256


def convert_type(value, target_type, default=None):
    """Attempts to convert the ``value`` to the given ``target_type``. Will
    return ``default`` if the conversion fails.

    Supported ``target_type`` values are:

    * `int` -- Convert to an integer value
    * `boolean` -- Convert to a boolean value (``True`` if the value is the
      ``unicode`` string "true" in any capitalisation
    * `list` -- Convert to a list, splitting on line-breaks and commas

    :param value: The value to convert
    :type value: `unicode`
    :param target_type: The target type to convert to
    :type target_type: `unicode`
    :param default: The default value if the conversion fails
    :return: The converted value
    """
    if target_type == 'int':
        try:
            return int(value)
        except ValueError:
            return default
    elif target_type == 'boolean':
        if value and value.lower() == 'true':
            return True
        else:
            return False
    elif target_type == 'list':
        return [v.strip() for line in value.split('\n') for v in line.split(',') if v.strip()]
    if value:
        return value
    else:
        return default


# Cached application settings for faster access
CACHED_SETTINGS = {}


def get_config_setting(request, key, target_type=None, default=None):
    """Gets a configuration setting from the application configuration.
    Settings are cached for faster access.

    :param request: The request used to access the configuration settings
    :type request: :class:`~pyramid.request.Request`
    :param key: The configuration key
    :type key: `unicode`
    :param target_type: If specified, will convert the configuration setting
                        to the given type using :func:`~toja.util.convert_type`
    :type default: The default value to return if there is no setting with the
                   given key
    :return: The configuration setting value or ``default``
    """
    global CACHED_SETTINGS
    if key in CACHED_SETTINGS:
        return CACHED_SETTINGS[key]
    else:
        if key in request.registry.settings:
            if target_type:
                CACHED_SETTINGS[key] = convert_type(request.registry.settings[key], target_type, default=default)
            else:
                CACHED_SETTINGS[key] = request.registry.settings[key]
        else:
            CACHED_SETTINGS[key] = default
        return get_config_setting(request, key, target_type=target_type, default=default)


def get_file_identifier(branch, filepath):
    """Calculate the file identifier.

    :param branch: The branch the file is on
    :type branch: :class:`~digi_edit.models.branch.Branch`
    :param filepath: The file's path
    :type filepath: ``string``
    :return: The file's identifier (sha256 hash)
    :rtype: ``string``
    """
    hash = sha256()
    hash.update(str(branch.id).encode('utf-8'))
    hash.update(b'$$')
    hash.update(filepath.encode('utf-8'))
    return hash.hexdigest()


def get_files_for_branch(request, branch):
    """Return a sorted list of absolute file paths to editable files within the ``branch``.

    :param request: The request to use for accessing settings
    :type request: :class:`~pyramid.request.Request`
    :param branch: The branch to return all files for
    :type branch: :class:`~digi_edit.models.branch.Branch`
    :return: A sorted list of absolute file paths
    :rtype: ``list`` of ``string``
    """
    base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{branch.id}')
    files = []
    for basepath, _, filenames in os.walk(base_path):
        if not basepath.endswith('.git') and '/.git/' not in basepath:
            for filename in filenames:
                files.append(os.path.join(basepath, filename))
    files.sort()
    return files
