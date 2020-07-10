from django.contrib import admin

from .models import Repository


class RepositoryAdmin(admin.ModelAdmin):

    list_display = ['title', 'name', 'url', 'local_path']

admin.site.register(Repository, RepositoryAdmin)
