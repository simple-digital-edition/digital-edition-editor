import json
import os
import re

from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import FileResponse
from pyramid.view import view_config

from digi_edit.models import Branch
from digi_edit.util import get_config_setting


@view_config(route_name='config.tei_schema', renderer='json')
def config_tei(request):
    filename = get_config_setting(request, 'tei.schema')
    if os.path.exists(filename):
        with open(filename) as in_f:
            data = json.load(in_f)
        return data
    else:
        raise HTTPNotFound()


@view_config(route_name='theme.css')
def css(request):
    filename = get_config_setting(request, 'css.customisation')
    if os.path.exists(filename):
        resp = FileResponse(filename, content_type='text/css')
        resp.headers['Cache-Control'] = 'no_store max-age=0'
        return resp
    else:
        raise HTTPNotFound()


@view_config(route_name='theme.extra_files')
def extra_files(request):
    for basepath in get_config_setting(request, 'themeing.files', target_type='list'):
        filename = os.path.abspath(os.path.join(basepath, *request.matchdict['path']))
        if filename.startswith(basepath):
            if os.path.exists(filename):
                resp = FileResponse(filename)
                resp.headers['Cache-Control'] = 'no_store max-age=0'
                return resp
            else:
                raise HTTPNotFound
        else:
            raise HTTPNotFound()
    raise HTTPNotFound()
