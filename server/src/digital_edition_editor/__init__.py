from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    settings['git.repos'] = dict([repo2.strip().split(':')
                                  for repo1 in settings['git.repos'].split('\n')
                                  for repo2 in repo1.split(',')])
    config = Configurator(settings=settings)
    config.include('.models')
    config.include('.routes')
    config.scan()
    return config.make_wsgi_app()
