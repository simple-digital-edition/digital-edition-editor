from django.templatetags.static import static
from django.urls import reverse
from django.utils.translation import gettext, ngettext
from jinja2 import Environment
from widget_tweaks.templatetags import widget_tweaks


def environment(**options):
    options['extensions'] = ['jinja2.ext.i18n']
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'url': reverse
    })
    env.filters.update({
        'add_class': widget_tweaks.add_class
    })
    env.install_gettext_callables(gettext=gettext, ngettext=ngettext, newstyle=True)
    return env
