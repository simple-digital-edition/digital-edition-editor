from pyramid.config import Configurator
from pyramid_jinja2.filters import route_url_filter, static_url_filter


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.commit()
    config.get_jinja2_environment().filters['static_url'] = static_url_filter
    config.get_jinja2_environment().filters['route_url'] = route_url_filter
    config.include('.models')
    config.include('.routes')
    config.scan()
    return config.make_wsgi_app()
