import json
import os
import re

from git import Repo
from github import Github
from gitlab import Gitlab
from pyramid.httpexceptions import HTTPOk
from pyramid.view import view_config

from digi_edit.models import Branch
from digi_edit.util import get_config_setting


@view_config(route_name='webhooks.github')
def github_webhook(request):
    branch_prefix = get_config_setting(request, 'git.branch_prefix', default='')
    if branch_prefix:
        branch_prefix = f'{branch_prefix}-'
    if 'X-GitHub-Event' in request.headers:
        if request.headers['X-GitHub-Event'] in ['pull_request', 'pull_request_review']:
            payload = json.loads(request.params['payload'])
            branch_ref = payload['pull_request']['head']['ref']
            match = re.fullmatch(f'{branch_prefix}-branch-([0-9]+)', branch_ref)
            if match:
                branch = request.dbsession.query(Branch).filter(Branch.id == match.group(1)).first()
                if branch:
                    gh = Github(get_config_setting(request, 'github.token'))
                    gh_repo = gh.get_repo(get_config_setting(request, 'github.repository'))
                    if branch.attributes['pull_request']:
                        pull_request = gh_repo.get_pull(branch.attributes['pull_request']['id'])
                        if pull_request.merged:
                            branch.pre_delete(request)
                            branch.attributes['status'] = 'merged'
                            branch.attributes['merged'] = payload['pull_request']['merged_at']
                            return HTTPOk()
                    else:
                        branch.attributes['pull_request'] = {'id': payload['number']}
                        pull_request = gh_repo.get_pull(branch.attributes['pull_request']['id'])
                    branch.attributes['pull_request']['state'] = pull_request.state
                    branch.attributes['pull_request']['mergeable'] = pull_request.mergeable
                    branch.attributes['pull_request']['reviews'] = list(map(lambda rv: {'state': rv.state,
                                                                                        'body': rv.body,
                                                                                        'user': rv.user.name},
                                                                            pull_request.get_reviews()))
        elif request.headers['X-GitHub-Event'] == 'push':
            payload = json.loads(request.params['payload'])
            match = re.fullmatch(r'refs/heads/([a-zA-Z\-0-9]+)', payload['ref'])
            if match:
                if match.group(1) == 'default':
                    for branch in request.dbsession.query(Branch):
                        if branch.attributes['status'] == 'active':
                            base_path = os.path.join(get_config_setting(request, 'git.dir'), branch.branch_name(request))
                            repo = Repo(base_path)
                            repo.remotes.origin.fetch('default:default', force=True)
                            repo.remotes.origin.pull()
                else:
                    match = re.fullmatch(f'{branch_prefix}-branch-([0-9]+)', match.group(1))
                    if match:
                        branch = request.dbsession.query(Branch).filter(Branch.id == match.group(1)).first()
                        if branch and branch.attributes['status'] == 'active':
                            base_path = os.path.join(get_config_setting(request, 'git.dir'), branch.branch_name(request))
                            repo = Repo(base_path)
                            repo.remotes.origin.pull()
    return HTTPOk()


@view_config(route_name='webhooks.gitlab')
def gitlab_webhook(request):
    branch_prefix = get_config_setting(request, 'git.branch_prefix', default='')
    if branch_prefix:
        branch_prefix = f'{branch_prefix}-'
    if 'X-Gitlab-Event' in request.headers:
        if request.headers['X-Gitlab-Event'] == 'Merge Request Hook':
            payload = json.loads(request.body)
            branch_ref = payload['object_attributes']['source_branch']
            match = re.fullmatch(f'{branch_prefix}-branch-([0-9]+)', branch_ref)
            if match:
                branch = request.dbsession.query(Branch).filter(Branch.id == match.group(1)).first()
                if branch:
                    gl = Gitlab(get_config_setting(request, 'gitlab.host'), get_config_setting(request, 'gitlab.token'))
                    gl_repo = gl.projects.get(get_config_setting(request, 'gitlab.projectid'))
                    if not branch.attributes['pull_request']:
                        branch.attributes['pull_request'] = None
                        for merge_request in gl_repo.mergerequests.list():
                            if merge_request.state == 'opened' and merge_request.source_branch == branch.branch_name(request):
                                branch.attributes['pull_request'] = {'id': merge_request.iid}
                                break
                    merge_request = gl_repo.mergerequests.get(branch.attributes['pull_request']['id'])
                    if merge_request.state == 'merged':
                        branch.pre_delete(request)
                        branch.attributes['pull_request']['state'] = 'merged'
                        branch.attributes['merged'] = merge_request.merged_at
                        branch.attributes['status'] = 'merged'
                    else:
                        if merge_request.state == 'opened':
                            branch.attributes['pull_request']['state'] = 'open'
                        else:
                            branch.attributes['pull_request']['state'] = merge_request.state
                        branch.attributes['pull_request']['mergeable'] = (merge_request.merge_status == 'can_be_merged')
                        branch.attributes['pull_request']['reviews'] = list(map(lambda nt: {'state': '',
                                                                                            'body': nt.body,
                                                                                            'user': nt.author['name']},
                                                                                [nt for nt in merge_request.notes.list()
                                                                                 if not nt.system]))
                        branch.attributes['pull_request']['reviews'].reverse()
        elif request.headers['X-Gitlab-Event'] == 'Note Hook':
            payload = json.loads(request.body)
            if 'merge_request'  in payload:
                branch_ref = payload['merge_request']['source_branch']
                match = re.fullmatch(f'{branch_prefix}-branch-([0-9]+)', branch_ref)
                if match:
                    branch = request.dbsession.query(Branch).filter(Branch.id == match.group(1)).first()
                    if branch:
                        gl = Gitlab(get_config_setting(request, 'gitlab.host'), get_config_setting(request, 'gitlab.token'))
                        gl_repo = gl.projects.get(get_config_setting(request, 'gitlab.projectid'))
                        merge_request = gl_repo.mergerequests.get(branch.attributes['pull_request']['id'])
                        branch.attributes['pull_request']['reviews'] = list(map(lambda nt: {'state': '',
                                                                                            'body': nt.body,
                                                                                            'user': nt.author['name']},
                                                                                [nt for nt in merge_request.notes.list()
                                                                                 if not nt.system]))
                        branch.attributes['pull_request']['reviews'].reverse()
        elif request.headers['X-Gitlab-Event'] == 'Push Hook':
            payload = json.loads(request.body)
            match = re.fullmatch(r'refs/heads/([a-zA-Z\-0-9]+)', payload['ref'])
            if match:
                if match.group(1) == 'default':
                    for branch in request.dbsession.query(Branch):
                        if branch.attributes['status'] == 'active':
                            base_path = os.path.join(get_config_setting(request, 'git.dir'), branch.branch_name(request))
                            repo = Repo(base_path)
                            repo.remotes.origin.fetch('default:default', force=True)
                            repo.remotes.origin.pull()
                else:
                    match = re.fullmatch(f'{branch_prefix}-branch-([0-9]+)', match.group(1))
                    if match:
                        branch = request.dbsession.query(Branch).filter(Branch.id == match.group(1)).first()
                        if branch and branch.attributes['status'] == 'active':
                            base_path = os.path.join(get_config_setting(request, 'git.dir'), branch.branch_name(request))
                            repo = Repo(base_path)
                            repo.remotes.origin.pull()
    return HTTPOk()
