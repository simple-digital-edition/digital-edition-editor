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
    header = {'tag': '{http://www.tei-c.org/ns/1.0}teiHeader'.replace('.', '::'),
              'children': [],
              'attrib': {},
              'text': '',
              'tail': ''}
    body = {'type': 'doc',
            'content': []}
    stack = []
    target = None
    for event, element in etree.iterparse(file, events=('start', 'end')):
        if event == 'start':
            if element.tag == '{http://www.tei-c.org/ns/1.0}teiHeader':
                stack.append(header)
                target = 'header'
            elif element.tag == '{http://www.tei-c.org/ns/1.0}body':
                stack.append(body)
                target = 'body'
            else:
                if target == 'header':
                    stack.append({'tag': element.tag.replace('.', '::'),
                                  'children': [],
                                  'attrib': dict([(key.replace('.', '::'), value)
                                                   for key, value in element.attrib.items()]),
                                  'text': element.text,
                                  'tail': element.tail})
                elif target == 'body':
                    if element.tag == '{http://www.tei-c.org/ns/1.0}head':
                        if element.attrib['style'] == 'main':
                            stack.append({'type': 'main_heading',
                                          'content': []})
                        else:
                            stack.append({'type': 'sub_heading',
                                          'content': []})
                        if element.text:
                            stack[-1]['content'].append({'type': 'text',
                                                         'text': element.text})
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}p':
                        if 'style' in element.attrib and 'no-indent' in element.attrib['style']:
                            stack.append({'type': 'paragraph_no_indent',
                                          'content': []})
                        else:
                            stack.append({'type': 'paragraph',
                                          'content': []})
                        if element.text:
                            stack[-1]['content'].append({'type': 'text',
                                                         'text': element.text})
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}span':
                        if 'style' in element.attrib:
                            if element.attrib['style'] == 'page-number' and element.text:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text,
                                                             'marks': [{'type': 'page_number'}]})
                            elif element.attrib['style'] == 'invert-font-family' and element.text:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text,
                                                             'marks': [{'type': 'invert_font_family'}]})
                            elif element.attrib['style'] == 'letter-sparse' and element.text:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text,
                                                             'marks': [{'type': 'letter_sparse'}]})
                            elif element.attrib['style'] == 'sup' and element.text:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text,
                                                             'marks': [{'type': 'sup'}]})
                            else:
                                print(element.attrib['style'])
                        else:
                            if element.text:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text})
        elif event == 'end':
            if len(stack) > 0:
                if target == 'header':
                    current = stack.pop()
                    if len(stack) > 0:
                        stack[-1]['children'].append(current)
                elif target == 'body':
                    if element.tag == '{http://www.tei-c.org/ns/1.0}head':
                        body['content'].append(stack.pop())
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}p':
                        body['content'].append(stack.pop())
                    elif element.tail:
                        stack[-1]['content'].append({'type': 'text',
                                                     'text': element.tail})
    return header, body


@view_config(route_name='file.get', renderer='json')
def get_file(request):
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


def build_etree_from_prosemirror(source):
    elem = etree.Element('{http://www.tei-c.org/ns/1.0}body')
    for block in source['content']:
        if block['type'] == 'main_heading':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}head')
            block_elem.attrib['style'] = 'main'
        elif block['type'] == 'sub_heading':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}head')
            block_elem.attrib['style'] = 'sub'
        elif block['type'] == 'paragraph':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}p')
        elif block['type'] == 'paragraph_no_indent':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}p')
            block_elem.attrib['style'] = 'no-indent'
        elem.append(block_elem)
        if 'content' in block:
            last_inline = None
            for inline in block['content']:
                if 'marks' in inline:
                    last_inline = etree.Element('{http://www.tei-c.org/ns/1.0}span')
                    last_inline.attrib['style'] = ' '.join([mark['type'].replace('_', '-') for mark in inline['marks']])
                    last_inline.text = inline['text']
                    block_elem.append(last_inline)
                else:
                    if last_inline is not None:
                        last_inline.tail = inline['text']
                    else:
                        block_elem.text = inline['text']
    return elem


@view_config(route_name='file.patch', renderer='json')
def patch_file(request):
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
            text.append(build_etree_from_prosemirror(body['data']['attributes']['body']))
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
