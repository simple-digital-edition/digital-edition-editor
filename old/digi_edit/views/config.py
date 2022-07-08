import json
import os

from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import FileResponse
from pyramid.view import view_config
from yaml import load
try:
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Loader

from digi_edit.util import get_config_setting


@view_config(route_name='config.tei_schema', renderer='json')
def config_tei_schema(request):
    filename = get_config_setting(request, 'config.tei_schema')
    if os.path.exists(filename):
        with open(filename) as in_f:
            data = load(in_f, Loader)
        request.response.headers['Cache-Control'] = 'no-store max-age=0'
        return data
    else:
        raise HTTPNotFound()


@view_config(route_name='config.ui', renderer='json')
def config_ui(request):
    filename = get_config_setting(request, 'config.ui')
    if os.path.exists(filename):
        with open(filename) as in_f:
            data = load(in_f, Loader)
        request.response.headers['Cache-Control'] = 'no-store max-age=0'
        return data
    else:
        raise HTTPNotFound()


@view_config(route_name='theme.css')
def css(request):
    filename = get_config_setting(request, 'theme.css')
    if os.path.exists(filename):
        resp = FileResponse(filename, content_type='text/css')
        resp.headers['Cache-Control'] = 'no-store max-age=0'
        return resp
    else:
        raise HTTPNotFound()


@view_config(route_name='theme.files')
def extra_files(request):
    for basepath in get_config_setting(request, 'theme.files', target_type='list'):
        filename = os.path.abspath(os.path.join(basepath, *request.matchdict['path']))
        if filename.startswith(basepath):
            if os.path.exists(filename):
                resp = FileResponse(filename)
                resp.headers['Cache-Control'] = 'no-store max-age=0'
                return resp
            else:
                raise HTTPNotFound
        else:
            raise HTTPNotFound()
    raise HTTPNotFound()
