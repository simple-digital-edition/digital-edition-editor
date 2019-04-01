from django.urls import path

from . import views


app_name = 'editor'

urlpatterns = [
    path('', views.repository.index, name='index'),
    path('repositories/<int:rid>', views.repository.repository, name='repository'),
    path('repositories/<int:rid>/files', views.files.listing, name='files'),
    path('repositories/<int:rid>/files/<str:fid>', views.files.edit, name='edit'),
    path('repositories/<int:rid>/files/<str:fid>/tei', views.files.raw_tei, name='raw_tei')
]
