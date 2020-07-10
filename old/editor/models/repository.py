from django.db import models

class Repository(models.Model):

    name = models.CharField(max_length=250)
    title = models.CharField(max_length=250)
    url = models.TextField()
    local_path = models.TextField()
    gitlab_api = models.TextField()
    gitlab_api_token = models.CharField(max_length=250)
