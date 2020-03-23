from django.db import models
from users.models import Profile

INSTRUMENT_OPTIONS = [("Piano","Piano"),("Vocals","Vocals"),("Bass","Bass"),("Drums","Drums")]

class Project(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length= 50)
    directory =models.CharField(max_length= 250)
    user = models.ForeignKey(Profile, on_delete= models.CASCADE)
    active = models.BooleanField(null=True, default= False)

class Voice(models.Model):
    id = models.AutoField(primary_key = True)
    instrument = models.CharField(max_length=50 , choices=INSTRUMENT_OPTIONS)
    isolated_voice_directory = models.CharField(max_length= 255, null= True)
    voice_sheet_directory = models.CharField(max_length= 255, null= True)
    voice_midi_directory = models.CharField(max_length= 255, null= True)
    voice_midi_audio_directory = models.CharField(max_length= 255, null= True)
    project = models.ForeignKey(Project, on_delete= models.CASCADE, related_name= 'voices')

# Create your models here.
