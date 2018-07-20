import hashlib
import json
import os

from lxml import etree
from pyramid.httpexceptions import HTTPNotFound, HTTPAccepted
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting


def find_file(base_path, file_hash):
    for path, _, filenames in os.walk(base_path):
        for filename in filenames:
            if filename.endswith('.tei'):
                filename = os.path.join(path[len(base_path) + 1:], filename)
                hash = hashlib.sha256()
                hash.update(filename.encode('utf-8'))
                if hash.hexdigest() == file_hash:
                    return filename
    return None


def file_to_json(file):
    header = {}
    body = {}
    stack = []
    for event, element in etree.iterparse(file, events=('start', 'end')):
        if event == 'start':
            if element.tag == '{http://www.tei-c.org/ns/1.0}teiHeader':
                stack.append(header)
            elif element.tag == '{http://www.tei-c.org/ns/1.0}body':
                stack.append(body)
            elif len(stack) > 0:
                stack.append({})
            if len(stack) > 0:
                current = stack[-1]
                current['tag'] = element.tag.replace('.', '::')
                current['children'] = []
                current['attrib'] = {}
                current['text'] = element.text
                current['tail'] = element.tail
                for key, value in element.attrib.items():
                    current['attrib'][key.replace('.', '::')] = value
        if event == 'end':
            if len(stack) > 0:
                current = stack.pop()
                if len(stack) > 0:
                    stack[-1]['children'].append(current)
    return header, body


@view_config(route_name='file.get', renderer='json')
def get_repositories(request):
    repository, fid = request.matchdict['fid'].split(':')
    repositories = get_config_setting(request, 'git.repos')
    if repository in repositories:
        local_file_path = find_file(repositories[repository], fid)
        if local_file_path:
            file_path = os.path.join(repositories[repository], local_file_path)
            with open(file_path, 'rb') as in_f:
                header, body = file_to_json(in_f)
            return {'data': {'type': 'files',
                             'id': request.matchdict['fid'],
                             'attributes': {'filename': local_file_path,
                                            'header': header,
                                            'body': body}}}
    return HTTPNotFound()


def build_etree_from_json(source):
    elem = etree.Element(source['tag'].replace('::', '.'))
    for key, value in source['attrib'].items():
        elem.attrib[key.replace('::', '.')] = value
    for child in source['children']:
        elem.append(build_etree_from_json(child))
    elem.text = source['text']
    elem.tail = source['tail']
    return elem


@view_config(route_name='file.patch', renderer='json')
def patch_repositories(request):
    repository, fid = request.matchdict['fid'].split(':')
    repositories = get_config_setting(request, 'git.repos')
    if repository in repositories:
        local_file_path = find_file(repositories[repository], fid)
        if local_file_path:
            file_path = os.path.join(repositories[repository], local_file_path)
            body = json.loads(request.body)
            tei = etree.Element('{http://www.tei-c.org/ns/1.0}TEI', nsmap={'tei': 'http://www.tei-c.org/ns/1.0'})
            tei.append(build_etree_from_json(body['data']['attributes']['header']))
            text = etree.Element('{http://www.tei-c.org/ns/1.0}text')
            text.append(build_etree_from_json(body['data']['attributes']['body']))
            tei.append(text)
            with open(file_path, 'wb') as out_f:
                out_f.write(etree.tostring(tei, pretty_print=True, xml_declaration=True, encoding="UTF-8"))
            with open(file_path, 'rb') as in_f:
                header, body = file_to_json(in_f)
            return {'data': {'type': 'files',
                             'id': request.matchdict['fid'],
                             'attributes': {'filename': local_file_path,
                                            'header': header,
                                            'body': body}}}
    raise HTTPNotFound
