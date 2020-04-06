from projects.models import Project
from .models import PendingSeparation
from .tasks import prueba_escritura_archivo

def createPendingSeparation(project, audioName):
    pending_separation = PendingSeparation()
    pending_separation.project = project
    pending_separation.audio_name = audioName
    pending_separation.save()
    prueba_escritura_archivo.delay(pending_separation.id)
