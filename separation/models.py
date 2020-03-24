from django.db import models

from projects.models import Project


class PendingSeparation(models.Model):
    project  = models.ForeignKey(Project,on_delete=models.CASCADE)
    audio_name = models.CharField(max_length=255)
