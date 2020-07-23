import json
import os
import re

from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
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


@view_config(route_name='config.css')
def css(request):
    filename = get_config_setting(request, 'css.customisation')
    if os.path.exists(filename):
        with open(filename) as in_f:
            data = in_f.read()
        return Response(body=data, headers=[('Content-Type', 'text/css')])
    else:
        raise HTTPNotFound()
