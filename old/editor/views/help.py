from django.conf import settings
from django.shortcuts import render


def index(request):
    return render(request, 'help/index.jinja2', {'version': settings.VERSION,
                                                 'history': settings.HISTORY})


def changelog(request):
    return render(request, 'help/changelog.jinja2', {'version': settings.VERSION,
                                                     'history': settings.HISTORY})
