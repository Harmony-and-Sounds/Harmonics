from projects.models import Project
from .models import PendingSeparation
from .tasks import separation_task

def createPendingSeparation(project, audioName):
    pending_separation = PendingSeparation()
    pending_separation.project = project
    pending_separation.audio_name = audioName
    pending_separation.save()
    separation_task.delay(pending_separation.id)
