from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


@method_decorator(csrf_exempt, name='dispatch')
class DefaultInstructionsApiView(APIView):

    def post(self, request):

        data = json.loads(request.body.decode("utf-8"))

        product_data = {
            'watering_days': data.get('watering_days'),
            'fertilizing_days': data.get('fertilizing_days'),
            'insolation': data.get('insolation'),
        }

        DefaultInstructions.objects.create(**product_data)

        data = {
            "message": "New item added to DefaultInstructions "
        }
        return JsonResponse(data, status=201)

    def get(self, request):
        item = CartItem.objects.all()[0]

        data = {
            'watering_days': item.watering_days,
            'fertilizing_days': item.fertilizing_days,
            'insolation': item.insolation,
        }

        return JsonResponse(data)