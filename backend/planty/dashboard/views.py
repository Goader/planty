from uuid import uuid4

from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.db.models import Model

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from .models import Plant, Instruction
from .serializers import (
    PlantCreateSerializer,
    PlantUpdateSerializer,
    PlantDeleteSerializer
)


class PlantsView(APIView):
    def get(self, request: Request):
        user: User = request.user
        plants = Plant.objects.filter(user=user)
        
        plants_json = []
        for plant in plants.iterator():

            plant_json = {
                'id': str(plant.id),
                'name': plant.name,
                'image': plant.photo_url,
                'species': plant.species,

                'watering': plant.instruction.watering,
                'insolation': plant.instruction.insolation,
                'fertilizing': plant.instruction.fertilizing,

                'other_info': plant.other_info
            }

            # plant_json = PlantSerializer(plant).data
            # instruction_json = InstructionSerializer(plant.instruction).data
            # print(plant_json)

            # plant_json.update(instruction_json)
            # print(plant_json)
            plants_json.append(plant_json)

        return Response(plants_json, status=status.HTTP_200_OK)

    def post(self, request: Request):
        user: User = request.user
        serializer = PlantCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        if data['image'] is not None:
            # TODO save the image somewhere
            pass
        image_url = None

        if 'used_instruction' in data:
            try:
                instruction = Instruction.objects.get(pk=data['used_instruction'])
            except Model.DoesNotExist:
                return Response(data={
                    'used_instruction': ['Instruction with the given ID does not exist']
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            instruction: Instruction = Instruction.objects.create(
                id=uuid4(),
                user=user,
                species=data['species'],
                watering=data['watering'],
                insolation=data['insolation'],
                fertilizing=data['fertilizing']
            )
            instruction.save()

        new_plant: Plant = Plant.objects.create(
            id=uuid4(),
            user=user,
            instruction=instruction,
            name=request.data['name'],
            species=request.data['species'],
            photo_url=image_url,
            other_info=request.data.get('other_info', '')
        )
        new_plant.save()

        return Response(status=status.HTTP_201_CREATED)

    def put(self, request):
        user: User = request.user
        serializer = PlantUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            plant: Plant = Plant.objects.get(pk=data['id'])
        except Model.DoesNotExist:
            return Response(data={
                'id': ['Plant with the given ID does not exist']
            }, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if 'image' in data:
            # TODO save the image somewhere and the url write to data['image']
            pass


        if 'used_instruction' in data:
            try:
                data['used_instruction'] = Instruction.objects.get(pk=data['used_instruction'])
            except Model.DoesNotExist:
                return Response(data={
                    'used_instruction': ['There is not Instruction with this ID']
                }, status=status.HTTP_404_NOT_FOUND)

        elif 'watering' in data or 'insolation' in data or 'fertilizing' in data:
            previous_instruction = plant.instruction

            # FIXME changing instruction properties frequently will lead to the
            # creation of numerous records in the database 
            # (will we clean them from time to time?)
            instruction: Instruction = Instruction.objects.create(
                id=uuid4(),
                user=user,
                species=data.get('species', plant.species),
                watering=data.get('watering', previous_instruction.watering),
                insolation=data.get('insolation', previous_instruction.insolation),
                fertilizing=data.get('fertilizing', previous_instruction.fertilizing)
            )
            instruction.save()

            data['used_instruction'] = instruction

        # updating the plant

        plant.instruction = data.get('used_instruction', plant.instruction)
        plant.name = data.get('name', plant.name)
        plant.species = data.get('species', plant.species)
        plant.photo_url = data.get('image', plant.photo_url)
        plant.other_info = data.get('other_info', plant.other_info)

        plant.save()

        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        user: User = request.user
        serializer = PlantDeleteSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            plant: Plant = Plant.objects.get(pk=data['id'])
        except Model.DoesNotExist:
            return Response(data={
                'id': ['Plant with the given ID does not exist']
            }, status=status.HTTP_204_NOT_FOUND)

        if plant.user == user:
            plant.delete()
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

        return Response(status=status.HTTP_200_OK)
