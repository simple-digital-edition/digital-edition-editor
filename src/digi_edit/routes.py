def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('root', '/')
    config.add_route('ui', '/ui*path')

    config.add_route('webhooks.github', '/webhooks/github', request_method='POST')
    config.add_route('webhooks.gitlab', '/webhooks/gitlab', request_method='POST')

    config.include('.views.api')
