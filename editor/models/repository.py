from django.db import models

class Repository(models.Model):

    name = models.CharField(max_length=250)
    title = models.CharField(max_length=250)
    url = models.CharField(max_length=250)
