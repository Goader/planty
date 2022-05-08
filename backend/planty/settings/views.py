from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .models import Settings
from .serializers import SettingsUpdateSerializer


class SettingsView(APIView):
    def get(self, request: Request):
        user: User = request.user
        try:
            settings: Settings = Settings.objects.get(user=user)
        except Settings.DoesNotExist:
            return Response("User settings not found.", status=status.HTTP_404_NOT_FOUND)

        return Response(settings.values(), status=status.HTTP_200_OK)

    def put(self, request: Request):
        user: User = request.user

        serializer = SettingsUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_settings = serializer.validated_data
        settings = Settings.objects.get(user=user)
        settings.__dict__.update(new_settings)
        settings.save()

        return Response(settings.values(), status=status.HTTP_201_CREATED)
