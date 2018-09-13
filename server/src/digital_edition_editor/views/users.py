import hashlib

from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting


@view_config(route_name='users.get', renderer='json')
def get_file(request):
    if 'filter[username]' in request.params and 'filter[password]' in request.params:
        users = get_config_setting(request, 'app.users', target_type='list')
        for user in users:
            username, password = user.split(':')
            if username == request.params['filter[username]'] and password == request.params['filter[password]']:
                hash = hashlib.sha256()
                hash.update(username.encode('utf-8'))
                hash.update('::'.encode('utf-8'))
                hash.update(password.encode('utf-8'))
                return {'data': {'id': username,
                                 'type': 'users',
                                 'attributes': {'username': username,
                                                'token': hash.hexdigest()}}}
    return HTTPNotFound()
