def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('root', '/')
    config.add_route('ui', '/ui*path')

    config.add_route('webhooks.github', '/webhooks/github', request_method='POST')
    config.add_route('webhooks.gitlab', '/webhooks/gitlab', request_method='POST')

    config.add_route('config', '/config')
    config.add_route('config.tei_schema', '/config/tei-schema')

    config.add_route('theme.css', '/theme/css')
    config.add_route('theme.extra_files', '/theme/extra/*path')

    config.include('.views.api')
