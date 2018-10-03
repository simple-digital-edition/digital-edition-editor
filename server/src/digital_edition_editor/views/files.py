import hashlib
import json
import os

from git import Repo, Actor
from lxml import etree
from pyramid.httpexceptions import HTTPNotFound, HTTPAccepted
from pyramid.view import view_config
from pywebtools.pyramid.util import get_config_setting

from .users import is_authenticated


NS = {'tei': 'http://www.tei-c.org/ns/1.0',
      'xml': 'http://www.w3.org/XML/1998/namespace'}
PREFIX = dict([('{%s}' % value, key) for key, value in NS.items()])


def to_prefix(identifier):
    if '}' in identifier:
        return '%s:%s' % (PREFIX[identifier[:identifier.find('}') + 1]], identifier[identifier.find('}') + 1:])
    else:
        return identifier


def to_ns(identifier):
    if ':' in identifier:
        return '{%s}%s' % (NS[identifier[:identifier.find(':')]], identifier[identifier.find(':') + 1:])
    else:
        return identifier


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


def load_header(doc):
    header = {}
    fields = {'title': '/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:title/text()',
              'author': '/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:author/text()',
              'published': '/tei:TEI/tei:teiHeader/tei:sourceDesc/tei:bibl/text()',
              'pub_date': {'machine': '/tei:TEI/tei:teiHeader/tei:profileDesc/tei:creation/tei:date/@when',
                           'human': '/tei:TEI/tei:teiHeader/tei:profileDesc/tei:creation/tei:date/text()'},
              'category': '/tei:TEI/tei:teiHeader/tei:profileDesc/tei:textClass/tei:catRef/@target',
              'editors': ('/tei:TEI/tei:teiHeader/tei:fileDesc/tei:titleStmt/tei:respStmt',
                          {'identifier': '@xml:id',
                           'name': 'tei:name/text()',
                           'resp': 'tei:resp/text()'}),
              'history': ('/tei:TEI/tei:teiHeader/tei:revisionDesc/tei:change',
                          {'who': '@who',
                           'when': '@when',
                           'change': 'text()'})}
    for key, path in fields.items():
        if isinstance(path, str):
            result = doc.xpath(path, namespaces=NS)
            if len(result) == 1:
                header[key] = result[0]
            elif len(result) > 1:
                header[key] = result
        elif isinstance(path, dict):
            header[key] = {}
            for sub_key, sub_path in path.items():
                result = doc.xpath(sub_path, namespaces=NS)
                if len(result) == 1:
                    header[key][sub_key] = result[0]
                elif len(result) > 1:
                    header[key][sub_key] = result[0]
        elif isinstance(path, tuple):
            def handle_sub_path(elem):
                part = {}
                for sub_key, sub_path in path[1].items():
                    result = elem.xpath(sub_path, namespaces=NS)
                    if len(result) == 1:
                        part[sub_key] = result[0]
                    elif len(result) > 1:
                        part[sub_key] = result[0]
                return part
            header[key] = [handle_sub_path(elem) for elem in doc.xpath(path[0], namespaces=NS)]
    return header


def load_body(doc):
    """Convert the body of the given file to the prosemirror data structure."""
    def load_inline(element):
        if len(element) == 0:
            inline = {'type': 'text',
                      'text': element.text,
                      'marks': []}
        else:
            inline = load_inline(element[0])
        if element.tag == '{http://www.tei-c.org/ns/1.0}hi':
            if 'style' in element.attrib:
                if 'letter-sparse' in element.attrib['style']:
                    inline['marks'].append({'type': 'letter_sparse'})
                if 'sup' in element.attrib['style']:
                    inline['marks'].append({'type': 'sup'})
                if 'font-size-large' in element.attrib['style']:
                    inline['marks'].append({'type': 'font_size_large'})
                if 'font-size-medium' in element.attrib['style']:
                    inline['marks'].append({'type': 'font_size_medium'})
                if 'font-size-small' in element.attrib['style']:
                    inline['marks'].append({'type': 'font_size_small'})
                if 'font-weight-bold' in element.attrib['style']:
                    inline['marks'].append({'type': 'font_weight_bold'})
        elif element.tag == '{http://www.tei-c.org/ns/1.0}foreign':
            inline['marks'].append({'type': 'foreign_language'})
        elif element.tag == '{http://www.tei-c.org/ns/1.0}pb':
            inline['marks'].append({'type': 'page_break'})
            inline['text'] = element.attrib['n']
        return inline

    body = {'type': 'doc',
            'content': []}
    for element in doc.xpath('/tei:TEI/tei:text/tei:body/*', namespaces=NS):
        if element.tag == '{http://www.tei-c.org/ns/1.0}head':
            if element.attrib['type'] == 'level-1':
                block = {'type': 'heading',
                         'attrs': {'level': 1},
                         'content': []}
            else:
                block = {'type': 'heading',
                         'attrs': {'level': 2},
                         'content': []}
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
        for child in element:
            block['content'].append(load_inline(child))
        body['content'].append(block)
    return body


@view_config(route_name='file.get', renderer='json')
@is_authenticated()
def get_file(request):
    repository, fid = request.matchdict['fid'].split(':')
    repositories = get_config_setting(request, 'git.repos')
    if repository in repositories:
        base_path = os.path.join(get_config_setting(request, 'git.basedir'),
                                 request.authorized_user['userid'],
                                 repository)
        local_file_path = find_file(base_path, fid)
        if local_file_path:
            file_path = os.path.join(base_path, local_file_path)
            with open(file_path, 'rb') as in_f:
                doc = etree.parse(in_f)
                header = load_header(doc)
                body = load_body(doc)
            repo = Repo(base_path)
            commit_msg = 'Updated %s' % os.path.basename(file_path)
            local_commits = list(repo.iter_commits('%s@{u}..%s' % (request.authorized_user['userid'],
                                                                   request.authorized_user['userid'])))
            if len(local_commits) > 0:
                if local_file_path in local_commits[0].stats.files:
                    commit_msg = local_commits[0].message
            return {'data': {'type': 'files',
                             'id': request.matchdict['fid'],
                             'attributes': {'filename': local_file_path,
                                            'commit-msg': commit_msg,
                                            'key': fid,
                                            'header': header,
                                            'body': body}}}
    return HTTPNotFound()


def save_header(source):
    def mkpath(parent, path):
        for child in parent:
            if child.tag == to_ns(path[0]):
                if len(path) > 1:
                    return mkpath(child, path[1:])
                else:
                    return child
        element = etree.Element(to_ns(path[0]))
        parent.append(element)
        if len(path) > 1:
            return mkpath(element, path[1:])
        else:
            return element

    fields = {'title': 'tei:fileDesc/tei:titleStmt/tei:title/text()',
              'author': 'tei:fileDesc/tei:titleStmt/tei:author/text()',
              'published': 'tei:sourceDesc/tei:bibl/text()',
              'pub_date': {'machine': 'tei:profileDesc/tei:creation/tei:date/@when',
                           'human': 'tei:profileDesc/tei:creation/tei:date/text()'},
              'category': 'tei:profileDesc/tei:textClass/tei:catRef/@target',
              'editors': ('tei:fileDesc/tei:titleStmt/tei:respStmt',
                          {'identifier': '@xml:id',
                           'name': 'tei:name/text()',
                           'resp': 'tei:resp/text()'}),
              'history': ('tei:revisionDesc/tei:change',
                          {'who': '@who',
                           'when': '@when',
                           'change': 'text()'})}
    header = etree.Element('{http://www.tei-c.org/ns/1.0}teiHeader')
    for field, path in fields.items():
        if isinstance(path, str):
            path = path.split('/')
            element = mkpath(header, path[:-1])
            if path[-1] == 'text()':
                element.text = source[field] if field in source else ''
            elif path[-1].startswith('@'):
                element.attrib[to_ns(path[-1][1:])] = source[field] if field in source else ''
        elif isinstance(path, dict):
            for sub_field, sub_path in path.items():
                sub_path = sub_path.split('/')
                element = mkpath(header, sub_path[:-1])
                if sub_path[-1] == 'text()':
                    element.text = source[field][sub_field] if field in source and sub_field in source[field] else ''
                elif sub_path[-1].startswith('@'):
                    element.attrib[to_ns(sub_path[-1][1:])] = source[field][sub_field] if field in source and sub_field in source[field] else ''
        elif isinstance(path, tuple):
            if field in source:
                base_path = path[0].split('/')
                parent = mkpath(header, base_path[:-1])
                for sub_source in source[field]:
                    element = etree.Element(to_ns(base_path[-1]))
                    for sub_field, sub_path in path[1].items():
                        sub_path = sub_path.split('/')
                        if len(sub_path) > 1:
                            sub_element = mkpath(element, sub_path[:-1])
                        else:
                            sub_element = element
                        if sub_path[-1] == 'text()':
                            sub_element.text = sub_source[sub_field] if sub_field in sub_source else ''
                        elif sub_path[-1].startswith('@'):
                            sub_element.attrib[to_ns(sub_path[-1][1:])] = sub_source[sub_field] if sub_field in sub_source else ''
                    parent.append(element)
    return header


def save_body(source):
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
                if 'marks' in inline and inline['marks']:
                    parent = block_elem
                    for mark in inline['marks']:
                        if mark['type'] == 'page_break':
                            text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}pb')
                            text_elem.attrib['n'] = inline['text']
                            if parent.text:
                                parent.text = ''
                            parent.append(text_elem)
                            parent = text_elem
                        elif mark['type'] == 'foreign_language':
                            text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}foreign')
                            text_elem.text = inline['text']
                            if parent.text:
                                parent.text = ''
                            parent.append(text_elem)
                            parent = text_elem
                        else:
                            if parent.tag == '{http://www.tei-c.org/ns/1.0}hi':
                                text_elem.attrib['style'] = '%s %s' % (text_elem.attrib['style'],
                                                                       mark['type'].replace('_', '-'))
                            else:
                                text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}hi')
                                text_elem.text = inline['text']
                                text_elem.attrib['style'] = mark['type'].replace('_', '-')
                                if parent.text:
                                    parent.text = ''
                                parent.append(text_elem)
                                parent = text_elem
                else:
                    text_elem = etree.Element('{http://www.tei-c.org/ns/1.0}seg')
                    text_elem.text = inline['text']
                    block_elem.append(text_elem)
    return elem


@view_config(route_name='file.patch', renderer='json')
@is_authenticated()
def patch_file(request):
    repository, fid = request.matchdict['fid'].split(':')
    repositories = get_config_setting(request, 'git.repos')
    if repository in repositories:
        base_path = os.path.join(get_config_setting(request, 'git.basedir'),
                                 request.authorized_user['userid'],
                                 repository)
        local_file_path = find_file(base_path, fid)
        if local_file_path:
            file_path = os.path.join(base_path, local_file_path)
            request_body = json.loads(request.body)
            with open(file_path, 'rb') as in_f:
                doc = etree.parse(in_f)
                old_header = load_header(doc)
                old_body = load_body(doc)
            tei = etree.Element('{http://www.tei-c.org/ns/1.0}TEI', nsmap={'tei': 'http://www.tei-c.org/ns/1.0'})
            if 'attributes' in request_body['data'] and 'header' in request_body['data']['attributes']:
                tei.append(save_header(request_body['data']['attributes']['header']))
            else:
                tei.append(save_header(old_header))
            text = etree.Element('{http://www.tei-c.org/ns/1.0}text')
            tei.append(text)
            if 'attributes' in request_body['data'] and 'body' in request_body['data']['attributes']:
                text.append(save_body(request_body['data']['attributes']['body']))
            else:
                text.append(save_body(old_body))
            with open(file_path, 'wb') as out_f:
                out_f.write(etree.tostring(tei, pretty_print=True, xml_declaration=True, encoding="UTF-8"))
            repositories = get_config_setting(request, 'git.repos')
            repo = Repo(base_path)
            if 'commit-msg' in request_body['data']['attributes']:
                commit_msg = request_body['data']['attributes']['commit-msg']
            else:
                commit_msg = 'Updated %s' % os.path.basename(file_path)
            if repo.index.diff(None):
                local_commits = list(repo.iter_commits('%s@{u}..%s' % (request.authorized_user['userid'],
                                                                       request.authorized_user['userid'])))

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
                doc = etree.parse(in_f)
                header = load_header(doc)
                body = load_body(doc)
            return {'data': {'type': 'files',
                             'id': request.matchdict['fid'],
                             'attributes': {'filename': local_file_path,
                                            'commit-msg': commit_msg,
                                            'header': header,
                                            'body': body}}}
    raise HTTPNotFound
