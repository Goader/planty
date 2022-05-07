from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .models import Settings
from .serializers import SettingsCreateSerializer


class SettingsView(APIView):
    def get(self, request: Request):
        user: User = request.user
        try:
            settings: Settings = Settings.objects.get(user=user)
        except Settings.DoesNotExist:
            return Response("User settings not found.", status=status.HTTP_404_NOT_FOUND)

        settings_json = {
            "account_notifications": settings.account_notifications,
            "watering_notifications": settings.watering_notifications,
            "forum_notifications": settings.forum_notifications
        }
        return Response(settings_json, status=status.HTTP_200_OK)

    def post(self, request: Request):
        user: User = request.user
        serializer = SettingsCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        new_settings, created = Settings.objects.update_or_create(user=user, defaults=data)

        new_settings.save()

        return Response(status=status.HTTP_201_CREATED)
