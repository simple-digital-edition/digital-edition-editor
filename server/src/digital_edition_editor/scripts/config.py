"""
####################################################################
:mod:`digital_edition_editor.scripts.config` - Configuration Scripts
####################################################################

Scripts to create and modify configuration scripts.
"""
import click

from kajiki import TextTemplate

DEFAULT_CONFIG = '''###########################
# Application configuration
###########################

[app:main]
# ==================
# User configuration
# ==================
# Each line is formatted `user_id:email:name:password`
app.users ={%if debug %}
    nobody:nobody@example.com:Nobody:password{%end%}

# ========================
# Repository configuration
# ========================
# -----------------
# Base storage path
# -----------------
git.basedir = {%if debug %}%(here)s/../local-repositories
# ----------------
# Git Repositories
# ----------------
# Each line is formatted `repository_id:git_url`
git.repos ={%if debug %}
    test:git@gitlab.example.com:path/to/repo.git{%end%}

# ==================
# Gitlab integration
# ==================
# ---------------
# Gitlab API URLs
# ---------------
# Each line is formatted `repository_id:gitlab_api_base`
gitlab.api ={%if debug %}
    test:https://gitlab.example.com/api/v4{%end%}
# ------------------
# Gitlab project ids
# ------------------
# Each line is
gitlab.projectid = {%if debug %}
    test:123{%end%}
# --------------------
# Gitlab access tokens
# --------------------
gitlab.token ={%if debug %}
    test:abc123efg456{%end%}

# Pyramid configuration
pyramid.reload_templates = ${debug}
pyramid.debug_authorization = false
pyramid.debug_notfound = false
pyramid.debug_routematch = false
pyramid.default_locale_name = en
pyramid.includes = {%if debug %}pyramid_debugtoolbar{%end%}

# Kajiki configuration
kajiki.mode = xml

# Server configuration
use = egg:digital-edition-editor

[server:main]
use = egg:waitress#main
listen = *:6543

###
# logging configuration
# https://docs.pylonsproject.org/projects/pyramid/en/1.9-branch/narr/logging.html
###

[loggers]
keys = root, digital_edition_editor, sqlalchemy

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console

[logger_digital_edition_editor]
level = {%if debug %}DEBUG{%else%}WARN{%end%}
handlers =
qualname = digital_edition_editor

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine
# "level = INFO" logs SQL queries.
# "level = DEBUG" logs SQL queries and results.
# "level = WARN" logs neither.  (Recommended for production systems.)

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(asctime)s %(levelname)-5.5s [%(name)s:%(lineno)s][%(threadName)s] %(message)s
'''


@click.command(name='create-config', help='Create a new configuration file')
@click.pass_context
@click.option('--debug', is_flag=True, default=False, help='Enable debug mode')
def create_config(ctx, **params):
    """Create a new configuration file"""
    with open(ctx.parent.params['configuration'], 'w') as out_f:
        tmpl = TextTemplate(DEFAULT_CONFIG)
        out_f.write(tmpl(params).render())
