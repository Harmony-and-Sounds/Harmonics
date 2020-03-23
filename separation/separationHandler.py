from projects.models import Project
from .models import PendingSeparation

def createPendingSeparation(project, audioName):
    pending_separation = PendingSeparation()
    pending_separation.project = project
    pending_separation.audio_name = audioName
    pending_separation.save()