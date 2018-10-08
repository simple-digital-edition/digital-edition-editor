from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    for setting in ['git.repos', 'gitlab.api', 'gitlab.projectid', 'gitlab.token']:
        settings[setting] = dict([(repo2[:repo2.find(':')], repo2[repo2.find(':') + 1:])
                                  for repo1 in settings[setting].split('\n')
                                  for repo2 in repo1.split(',') if repo2.strip()])
    config = Configurator(settings=settings)
    #config.include('.models')
    config.include('.routes')
    config.scan()
    return config.make_wsgi_app()
