from wsgiref.util import FileWrapper

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.viewsets import ViewSet

from harmonicsServer.settings import BASE_DIR
from .models import Project
from .projectSerializer import ProjectSerializer
from .projectPermissions import projectPermissions
from . import projectHandler

class ProjectRestController (ViewSet):
    queryset = ''
    permission_classes = (projectPermissions,)
    parser_classes = (MultiPartParser, FormParser,)

    def list(self,request):
        projects = Project.objects.filter(active = True)
        ser = ProjectSerializer(projects, many=True)
        return Response(ser.data, status.HTTP_200_OK)

    def create(self, request):
        project = None
        try:
            project = projectHandler.createProject(request.data,request.user,request.FILES['file'])
        except AssertionError:
            return Response("Error: proyecto ya creado con ese nombre" ,status.HTTP_409_CONFLICT)
        return Response(project.name, status.HTTP_201_CREATED)


    @action(methods=['GET'], url_path='voice/(?P<voiceId>[0-9]+)', detail=False)
    def get_isolated_voice(self, request, voiceId):
        directory = BASE_DIR+"/testfiles/vocals.mp3"
        file = open(directory, 'rb')
        response = HttpResponse(FileWrapper(file), content_type='audio')
        response['Content-Disposition'] = 'attachment; filename="%s"' % 'vocals.mp3'
        return response

    @action(methods=['GET'], url_path='voice/(?P<voiceId>[0-9]+)/transcription/sheet', detail=False)
    def get_transcription_sheet(self, request, voiceId):
        directory = BASE_DIR + "/testfiles/midi_sheet.pdf"
        file = open(directory, 'rb')
        response = HttpResponse(FileWrapper(file), content_type='audio')
        response['Content-Disposition'] = 'attachment; filename="%s"' % 'midi_sheet.pdf'
        return response

    @action(methods=['GET'], url_path='voice/(?P<voiceId>[0-9]+)/transcription/midi', detail=False)
    def get_transcription_midi(self, request, voiceId):
        directory = BASE_DIR + "/testfiles/vocals_midi.mid"
        file = open(directory, 'rb')
        response = HttpResponse(FileWrapper(file), content_type='audio')
        response['Content-Disposition'] = 'attachment; filename="%s"' % 'vocals_midi.mid'
        return response

    @action(methods=['GET'], url_path='voice/(?P<voiceId>[0-9]+)/transcription/audio', detail=False)
    def get_transcription_audio(self, request, voiceId):
        directory = BASE_DIR + "/testfiles/midi_audio.mp3"
        file = open(directory, 'rb')
        response = HttpResponse(FileWrapper(file), content_type='audio')
        response['Content-Disposition'] = 'attachment; filename="%s"' % 'midi_audio.mp3'
        return response

    def retrieve(self,request,pk):
        project = Project.objects.get(id = pk)
        ser = ProjectSerializer(project)
        return Response(ser.data,status.HTTP_200_OK)


# Create your views here.
