from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from uuid import uuid4

from .models import UserPlants


class UserPlantsView(APIView):
    def get(self, request):
        user = request.user
        username = user.get_username()

        user_plants, created = UserPlants.objects.get_or_create(username=username, defaults={"plant_collection": []})

        return Response(user_plants.plant_collection, status=status.HTTP_200_OK)

    # Currently, required to provide all Plant object fields in request except for id, at least empty string.
    def post(self, request):
        user = request.user
        username = user.get_username()

        new_plant = request.data.dict()

        user_plants, created = UserPlants.objects.get_or_create(username=username, defaults={"plant_collection": []})

        new_plant["plant_id"] = str(uuid4())
        user_plants.plant_collection.append(new_plant)
        user_plants.save()

        return Response(user_plants.plant_collection, status=status.HTTP_200_OK)

    # Only id is required
    def patch(self, request):
        user = request.user
        username = user.get_username()

        plant_patch = request.data.dict()

        if "plant_id" not in plant_patch:
            return Response(f"Plant_id field is required", status=status.HTTP_400_BAD_REQUEST)

        try:
            user_plants = UserPlants.objects.get(username=username)
        except UserPlants.DoesNotExist as e:
            return Response(f"User does not a plant collection", status=status.HTTP_400_BAD_REQUEST)

        for plant in user_plants.plant_collection:
            if plant["plant_id"] == plant_patch["plant_id"]:
                plant.update(plant_patch)
                break

        user_plants.save()

        return Response(user_plants.plant_collection, status=status.HTTP_200_OK)

    def delete(self, request):
        user = request.user
        username = user.get_username()

        plant_id = request.data.dict().get("plant_id", None)

        if plant_id is None:
            return Response(f"Plant_id field is required", status=status.HTTP_400_BAD_REQUEST)

        try:
            user_plants = UserPlants.objects.get(username=username)
        except UserPlants.DoesNotExist as e:
            return Response(f"User does not a plant collection", status=status.HTTP_400_BAD_REQUEST)

        for plant in user_plants.plant_collection:
            if plant["plant_id"] == plant_id:
                user_plants.plant_collection.remove(plant)
                break

        user_plants.save()

        return Response(user_plants.plant_collection, status=status.HTTP_200_OK)


