from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DefaultInstructionsSerializer


class DefaultInstructionsApiView(APIView):
    # @api_view(['GET'])
    def get(self, request):
        instructions = Snippet.objects.all()
        serializer = DefaultInstructionsSerializer(instructions, many=True)
        return Response(serializer.data)
