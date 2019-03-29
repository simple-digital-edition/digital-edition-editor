from django.contrib import admin

from .models import Repository

class RepositoryAdmin(admin.ModelAdmin):

    list_display = ['title', 'name', 'url']

admin.site.register(Repository, RepositoryAdmin)
