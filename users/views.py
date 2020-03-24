from rest_framework.decorators import action, permission_classes
from rest_framework.parsers import FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from django.shortcuts import render
from .userSerializer import ProfileSerializer,ProfileGetSerializer
from .models import  Profile

class ProfileRestController (ViewSet):
    queryset = ''
    serializer_class = ProfileSerializer

    def list(self, request):
        profiles = Profile.objects.all()
        ser = ProfileGetSerializer(profiles,many=True)
        return Response(ser.data, status.HTTP_200_OK)

    def create(self, request):
        ser = ProfileSerializer()
        profile = ser.create(request.data)
        return Response(profile.user.username, status.HTTP_201_CREATED)

    @action(methods=['GET'], detail= False, url_path='detail', permission_classes=(IsAuthenticated,))
    def retrieve_user(self,request):
        profile = Profile.objects.get(user = request.user)
        ser = ProfileGetSerializer(profile)
        return Response(ser.data,status.HTTP_200_OK)
