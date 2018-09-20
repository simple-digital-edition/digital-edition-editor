import hashlib
import json
import os

from git import Repo, Actor
from lxml import etree
from pyramid.httpexceptions import HTTPNotFound, HTTPAccepted
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting

from .users import is_authenticated


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
                        if element.attrib['type'] == 'level-1':
                            stack.append({'type': 'heading',
                                          'attrs': {'level': 1},
                                          'content': []})
                        else:
                            stack.append({'type': 'heading',
                                          'attrs': {'level': 2},
                                          'content': []})
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}p':
                        block = {'type': 'paragraph',
                                 'attrs': {'no_indent': False,
                                           'text_align': 'left'},
                                 'content': []}
                        if 'style' in element.attrib:
                            if 'no-indent' in element.attrib['style']:
                                block['attrs']['no_indent'] = True
                            if 'text-center' in element.attrib['style']:
                                block['attrs']['text_align'] = 'center'
                            elif 'text-right' in element.attrib['style']:
                                block['attrs']['text_align'] = 'right'
                        stack.append(block)
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}span':
                        marks = []
                        if 'type' in element.attrib:
                            if element.attrib['type'] == 'foreign-language':
                                marks.append({'type': 'foreign_language'})
                        if 'style' in element.attrib:
                            if 'letter-sparse' in element.attrib['style']:
                                marks.append({'type': 'letter_sparse'})
                            if 'sup' in element.attrib['style']:
                                marks.append({'type': 'sup'})
                            if 'font-size-large' in element.attrib['style']:
                                marks.append({'type': 'font_size_large'})
                            if 'font-size-medium' in element.attrib['style']:
                                marks.append({'type': 'font_size_medium'})
                            if 'font-size-small' in element.attrib['style']:
                                marks.append({'type': 'font_size_small'})
                        if element.getparent().tag == '{http://www.tei-c.org/ns/1.0}span' :
                            if element.text:
                                stack[-1]['content'][-1]['text'] = element.text
                            stack[-1]['content'][-1]['marks'].extend(marks)
                        else:
                            if element.text or len(element) > 0:
                                stack[-1]['content'].append({'type': 'text',
                                                             'text': element.text,
                                                             'marks': marks})
                    elif element.tag == '{http://www.tei-c.org/ns/1.0}pb':
                        stack[-1]['content'].append({'type': 'text',
                                                     'text': element.attrib['n'],
                                                     'marks': [{'type': 'page_break'}]})
                    else:
                        print(element.tag)
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
    return header, body


@view_config(route_name='file.get', renderer='json')
@is_authenticated()
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
                                            'key': fid,
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
    #elem.tail = source['tail']
    return elem


def build_etree_from_prosemirror(source):
    elem = etree.Element('{http://www.tei-c.org/ns/1.0}body')
    for block in source['content']:
        if block['type'] == 'heading':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}head')
            block_elem.attrib['type'] = 'level-%i' % block['attrs']['level']
        elif block['type'] == 'paragraph':
            block_elem = etree.Element('{http://www.tei-c.org/ns/1.0}p')
            styles = []
            if 'attrs' in block:
                if 'no_indent' in block['attrs'] and block['attrs']['no_indent']:
                    styles.append('no-indent')
                if 'text_align' in block['attrs']:
                    if block['attrs']['text_align'] == 'center':
                        styles.append('text-center')
                    elif block['attrs']['text_align'] == 'right':
                        styles.append('text-right')
            if styles:
                block_elem.attrib['style'] = ' '.join(styles)
        elem.append(block_elem)
        if 'content' in block:
            last_inline = None
            for inline in block['content']:
                if 'marks' in inline:
                    parent = block_elem
                    for mark in inline['marks']:
                        if mark['type'] == 'page_break':
                            text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}pb')
                            text_elem.attrib['n'] = inline['text']
                            if parent.text:
                                parent.text = ''
                        else:
                            text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}span')
                            text_elem.text = inline['text']
                            if mark['type'] == 'foreign_language':
                                text_elem.attrib['type'] = 'foreign-language'
                            else:
                                text_elem.attrib['style'] = mark['type'].replace('_', '-')
                            if parent.text:
                                parent.text = ''
                        parent.append(text_elem)
                        parent = text_elem
                else:
                    text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}span')
                    text_elem.text = inline['text']
                    block_elem.append(text_elem)
    return elem


@view_config(route_name='file.patch', renderer='json')
@is_authenticated()
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
            repositories = get_config_setting(request, 'git.repos')
            base_path = repositories[repository]
            repo = Repo(base_path)
            if repo.index.diff(None):
                local_commits = list(repo.iter_commits('master@{u}..master'))
                commit_msg = 'Updated %s' % os.path.basename(file_path)
                # Ammend the last commit if it has the same commit message as the new one
                if len(local_commits) > 0 and local_commits[0].message == commit_msg and \
                    local_commits[0].author.email == request.authorized_user['username']:
                    repo.index.add([os.path.abspath(file_path)])
                    repo.git.commit('--amend',
                                    '-m %s' % commit_msg,
                                    '--author="%s <%s>"' % (request.authorized_user['name'],
                                                            request.authorized_user['username']))
                else:
                    repo.index.add([os.path.abspath(file_path)])
                    actor = Actor(request.authorized_user['name'], request.authorized_user['username'])
                    repo.index.commit(commit_msg, author=actor, committer=actor)
            with open(file_path, 'rb') as in_f:
                header, body = file_to_json(in_f)
            return {'data': {'type': 'files',
                             'id': request.matchdict['fid'],
                             'attributes': {'filename': local_file_path,
                                            'header': header,
                                            'body': body}}}
    raise HTTPNotFound
