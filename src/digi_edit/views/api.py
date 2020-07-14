from digi_edit.models import User


def includeme(config):
    config.add_route('api', '/api')

    generate_api(config, 'users', User)


def generate_api(config, type_name, db_class):
    def collection_get(request):
        return {}

    def item_get(request):
        return {}

    config.add_route(f'api.{type_name}.collection.get', f'/api/{type_name}', request_method='GET')
    config.add_view(collection_get, route_name=f'api.{type_name}.collection.get', renderer='json')
    config.add_route(f'api.{type_name}.item.get', f'/api/{type_name}/{{iid}}', request_method='GET')
    config.add_view(item_get, route_name=f'api.{type_name}.item.get', renderer='json')
