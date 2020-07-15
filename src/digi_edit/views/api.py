import json
import os

from cerberus import Validator
from copy import deepcopy
from hashlib import sha256, sha512
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized, HTTPNotFound, HTTPNoContent
from secrets import token_hex

from digi_edit.models import User, Branch
from digi_edit.util import jsonapi_type_schema, get_config_setting


def includeme(config):
    config.add_route('api', '/api')

    generate_api(config, 'users', User)
    config.add_route('api.users.item.post', '/api/users/login', request_method='POST')
    config.add_view(users_item_post, route_name='api.users.item.post', renderer='json')
    generate_api(config, 'branches', Branch)
    config.add_route(f'api.files.item.get', f'/api/files/{{iid}}', request_method='GET')
    config.add_view(files_item_get, route_name=f'api.files.item.get', renderer='json')


def flatten_errors(errors, path=''):
    """Flatten Cerberus errors into the JSONAPI structure."""
    flat_errors = []
    for key, values in errors.items():
        for value in values:
            if isinstance(value, dict):
                flat_errors.extend(flatten_errors(value, path='{0}/{1}'.format(path, key)))
            else:
                flat_errors.append({'title': '{0}{1}'.format(value[0].title(), value[1:]),
                                    'source': {'pointer': '{0}/{1}'.format(path, key)}})
    return flat_errors


def validate_body(body, schema):
    try:
        body = json.loads(body)
        validator = Validator({'data': {'type': 'dict',
                                        'schema': deepcopy(schema),
                                        'required': True}})
        if validator.validate(body):
            return validator.validated(body)['data']
        else:
            raise HTTPBadRequest(body=json.dumps({'errors': flatten_errors(validator.errors)}))
    except json.decoder.JSONDecodeError:
        raise HTTPBadRequest(body=json.dumps({'errors': [
            {'title': 'Invalid JSON Data'}
        ]}))


user_login_schema = {
    'type': jsonapi_type_schema('users'),
    'attributes': {'type': 'dict',
                   'schema': {'email': {'type': 'string',
                                        'required': True,
                                        'empty': False},
                              'password': {'type': 'string',
                                           'required': True,
                                           'empty': False}}}}


def users_item_post(request):
    """Handle user login."""
    body = validate_body(request.body, user_login_schema)
    user = request.dbsession.query(User).filter(User.email == body['attributes']['email']).first()
    if user:
        hash = sha512()
        hash.update(user.salt.encode('utf-8'))
        hash.update(b'$$')
        hash.update(body['attributes']['password'].encode('utf-8'))
        if user.password == hash.hexdigest():
            user.attributes['token'] = token_hex(64)
            return user.as_jsonapi()
        else:
            raise HTTPBadRequest(body=json.dumps({
                'errors': [
                    {'title': 'User not found, password incorrect, or blocked',
                     'source': {'pointer': 'data/attributes/email'}},
                    {'title': 'User not found, password incorrect, or blocked',
                     'source': {'pointer': 'data/attributes/password'}},
                ]
            }))
    else:
        raise HTTPBadRequest(body=json.dumps({
            'errors': [
                {'title': 'User not found, password incorrect, or blocked',
                 'source': {'pointer': 'data/attributes/email'}},
                {'title': 'User not found, password incorrect, or blocked',
                 'source': {'pointer': 'data/attributes/password'}},
            ]
        }))


def files_item_get(request):
    check_authorization(request)
    files = {}
    for branch in request.dbsession.query(Branch):
        base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{branch.id}')
        for basepath, _, filenames in os.walk(base_path):
            if not basepath.endswith('.git') and '/.git/' not in basepath:
                for filename in filenames:
                    identifier = sha256((str(branch.id) + '$$' + os.path.join(basepath, filename)).encode('utf-8')).hexdigest()
                    files[identifier] = {'branch': branch,
                                         'filename': os.path.join(basepath, filename)}
    if request.matchdict['iid'] in files:
        base_path = base_path = os.path.join(get_config_setting(request, 'git.dir'), f'branch-{files[request.matchdict["iid"]]["branch"]}')
        pathname, filename = os.path.split(files[request.matchdict['iid']]['filename'])
        pathname = pathname[len(base_path):]
        if not pathname:
            pathname = '/'
        with open(files[request.matchdict['iid']]['filename']) as in_f:
            data = in_f.read()
        return {'data': {'type': 'files',
                         'id': request.matchdict['iid'],
                         'attributes': {
                             'path': pathname,
                             'filename': filename,
                             'data': data,
                         }}}
    else:
        raise HTTPNotFound()


def check_authorization(request):
    if 'X-Authorization' in request.headers:
        try:
            userId, token = request.headers['X-Authorization'].split(' ')
            user = request.dbsession.query(User).filter(User.id == userId).first()
            if user and 'token' in user.attributes and user.attributes['token'] == token:
                return True
            else:
                raise HTTPUnauthorized()
        except:
            raise HTTPUnauthorized()
    else:
        raise HTTPUnauthorized()


def generate_api(config, type_name, db_class):
    def collection_get(request):
        check_authorization(request)
        objs = request.dbsession.query(db_class)
        return {'data': [obj.as_jsonapi(request) for obj in objs]}

    def collection_post(request):
        check_authorization(request)
        body = validate_body(request.body, db_class.create_schema())
        obj = db_class(attributes=body['attributes'])
        if hasattr(obj, 'pre_create'):
            obj.pre_create(request)
        request.dbsession.add(obj)
        if hasattr(obj, 'post_create'):
            request.dbsession.flush()
            request.dbsession.add(obj)
            obj.post_create(request)
        return {'data': obj.as_jsonapi(request)}

    def item_get(request):
        check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj:
            return {'data': obj.as_jsonapi(request)}
        else:
            raise HTTPNotFound()

    def item_delete(request):
        check_authorization(request)
        obj = request.dbsession.query(db_class).filter(db_class.id == request.matchdict['iid']).first()
        if obj:
            if hasattr(obj, 'pre_delete'):
                obj.pre_delete(request)
            request.dbsession.delete(obj)
            return HTTPNoContent()
        else:
            raise HTTPNotFound()

    config.add_route(f'api.{type_name}.collection.get', f'/api/{type_name}', request_method='GET')
    config.add_view(collection_get, route_name=f'api.{type_name}.collection.get', renderer='json')
    config.add_route(f'api.{type_name}.collection.post', f'/api/{type_name}', request_method='POST')
    config.add_view(collection_post, route_name=f'api.{type_name}.collection.post', renderer='json')
    config.add_route(f'api.{type_name}.item.get', f'/api/{type_name}/{{iid}}', request_method='GET')
    config.add_view(item_get, route_name=f'api.{type_name}.item.get', renderer='json')
    config.add_route(f'api.{type_name}.item.delete', f'/api/{type_name}/{{iid}}', request_method='DELETE')
    config.add_view(item_delete, route_name=f'api.{type_name}.item.delete', renderer='json')
