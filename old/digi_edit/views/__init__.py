from importlib import resources
from importlib.abc import Traversable
from mimetypes import guess_type
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name='root')
def root(request):
    return HTTPFound(request.route_url('ui', path=()))


@view_config(route_name='ui')
def ui(request):
    path = request.matchdict['path']
    base = resources.files('digi_edit')
    public = base / 'frontend' / 'public'
    try:
        return send_resource(public, path)
    except FileNotFoundError:
        return send_resource(public, ('index.html', ))


def send_resource(resource, path):
    for part in path:
        resource = resource / part
    try:
        mimetype = guess_type(path[-1])
        headers = {}
        if mimetype and mimetype[0]:
            headers['Content-Type'] = mimetype[0]
        return Response(body=resource.read_bytes(), headers=headers)
    except IsADirectoryError:
        raise FileNotFoundError
    except IndexError:
        raise FileNotFoundError
