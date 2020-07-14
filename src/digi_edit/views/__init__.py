from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config

@view_config(route_name='root')
def root(request):
    return HTTPFound(request.route_url('ui', path=()))


@view_config(route_name='ui', renderer='digi_edit:templates/ui.jinja2')
def ui(request):
    return {}
