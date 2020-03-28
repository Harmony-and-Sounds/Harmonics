from django.db import transaction
from rest_framework import serializers
from .models import Project,Voice
from users.models import Profile
from harmonicsServer.settings import BASE_DIR
from users.userSerializer import ProfileGetSerializer
import os
class VoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voice
        fields = ("id","instrument")

class ProjectSerializer(serializers.ModelSerializer):
    voices = VoiceSerializer(many=True,read_only=True)
    user = serializers.CharField(max_length=50 , source= "user.user.username")
    class Meta:
        model = Project
        fields = ("id","name","voices","user")

    @transaction.atomic
    def create(self, validated_data, user):
        profile = Profile.objects.get(user = user)
        project = Project.objects.filter(user__user = user, name= validated_data['project_name'])
        if project.count() > 0 :
            raise AssertionError("Erro: ya existe un proyecto creado cone se nombre")

        project = Project()
        project.name = validated_data['project_name']
        project.directory = "/media/"+user.username+"/"+project.name
        project.user = profile
        project.save()
        os.mkdir(BASE_DIR + project.directory)

        for instrument in validated_data['instruments'].split(",") :
            voice = Voice()
            voice.instrument = instrument
            voice.project = project
            voice.save()
            os.mkdir(BASE_DIR + project.directory+"/"+instrument)

        return project

