import os.path

from pkg_resources import resource_filename
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from pyramid.response import Response, FileResponse
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting
from urllib.parse import quote_plus


@view_config(route_name='editor', renderer='json')
def redirect_editor(request):
    repositories = get_config_setting(request, 'git.repos')
    raise HTTPFound(request.route_url('editor.file', path=('',)))


@view_config(route_name='editor.file', renderer='json')
def get_editor(request):
    if request.matchdict['path']:
        path = os.path.join(resource_filename('digital_edition_editor', 'static'), *request.matchdict['path'])
    else:
        path = os.path.join(resource_filename('digital_edition_editor', 'static'), '')
    if path.endswith('/'):
        path = os.path.join(path, 'index.html')
        prefix = get_config_setting(request, 'filter-prefix')
        if not prefix:
            prefix = ''
        with open(path) as in_f:
            body = in_f.read()
            body = body.replace(quote_plus('${filter-prefix}'), quote_plus(prefix))
        return Response(body=body)
    else:
        return FileResponse(path)
