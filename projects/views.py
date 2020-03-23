from django.shortcuts import render
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


    def retrieve(self,request,pk):
        project = Project.objects.get(id = pk)
        ser = ProjectSerializer(project)
        return Response(ser.data,status.HTTP_200_OK)


# Create your views here.
