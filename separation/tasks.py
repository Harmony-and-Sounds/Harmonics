from celery import task
from .models import PendingSeparation
from .separator.separator_controller import createSeparation
from harmonicsServer.settings import BASE_DIR
import os
import time

@task
def separation_task(id):

    separation = PendingSeparation.objects.get(id = id)
    print(separation.project.user.user.username)
    path = BASE_DIR + "/media/"+separation.project.user.user.username+"/queue/"+separation.audio_name
    createSeparation(path,separation.project)
    os.remove(path)
    separation.delete()
    return "chingon"