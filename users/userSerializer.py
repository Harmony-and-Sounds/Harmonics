from django.db import transaction
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import os
from harmonicsServer.settings import BASE_DIR

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","password","email"]

class ProfileSerializer(serializers.ModelSerializer):
    user= UserSerializer(many=False, read_only=False)

    class Meta:
        model = Profile
        fields = ["id","user","pending_notifications"]

    @transaction.atomic
    def create(self, validated_data):
        user = User()
        user.username = validated_data['username']
        user.password = make_password(validated_data['password'])
        user.email = validated_data.get("email","")
        user.save()
        profile = Profile()
        profile.pending_notifications =False
        profile.user = user
        profile.save()
        os.mkdir(BASE_DIR+"/media/"+user.username)
        os.mkdir(BASE_DIR+"/media/"+user.username+"/queue")
        return profile

class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email"]

class ProfileGetSerializer(serializers.ModelSerializer):
    user= UserGetSerializer(many=False, read_only=False)

    class Meta:
        model = Profile
        fields = ["id","user","pending_notifications"]
