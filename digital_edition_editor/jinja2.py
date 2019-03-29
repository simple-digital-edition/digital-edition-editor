from django.templatetags.static import static
from django.urls import reverse
from jinja2 import Environment
from widget_tweaks.templatetags import widget_tweaks


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'url': reverse
    })
    env.filters.update({
        'add_class': widget_tweaks.add_class
    })
    return env
