def includeme(config):
    config.add_route('users.get', '/users', request_method='GET')
    config.add_route('editor', '/')
    config.add_route('editor.file', '/editor/*path')
    config.add_route('repositories.get', '/repositories', request_method='GET')
    config.add_route('repository.get', '/repositories/{rid}', request_method='GET')
    config.add_route('repository.patch', '/repositories/{rid}', request_method='PATCH')
    config.add_route('file.get', '/files/{fid}', request_method='GET')
    config.add_route('file.patch', '/files/{fid}', request_method='PATCH')
