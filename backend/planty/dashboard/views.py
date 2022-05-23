from datetime import timedelta, date, datetime
from uuid import uuid4
from math import ceil

from django.contrib.auth.models import User
from django.db.models import Model

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from .notifier import Notifier
from .models import Plant, Instruction, CustomEvent
from .serializers import (
    CustomEventCreateSerializer,
    EventCreateSerializer,
    PlantCreateSerializer,
    PlantUpdateSerializer,
    PlantDeleteSerializer,
    TimeSpanSerializer
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


class EventsView(APIView):
    def get(self, request: Request):
        user: User = request.user
        serializer = TimeSpanSerializer(data=request.query_params)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']
        today = date.today()

        events = []

        # history events
        if start_date < today:
            history_start_date = start_date
            history_end_date = min(today, end_date)
            # TODO add this

        # upcoming events
        if end_date >= today:
            upcoming_start_date = max(today, start_date)
            upcoming_end_date = end_date

            def calculate_events(plant: Plant, action: str, last: date, interval: int):
                interval = timedelta(days=interval)
                planned_date: date = last + interval
                real_date: date = max(planned_date, today)

                # if it is not the first upcoming event, then we cannot assign
                # a priority to it, because it depends when the first will end
                first = real_date >= upcoming_start_date

                # if the start_date is far away, then we need to start iterating
                # from the first date in the requested period
                n = max(0, ceil((upcoming_start_date - real_date) / interval))
                real_date += n * interval

                while real_date < upcoming_end_date:
                    priority = max(0, (today - planned_date).days) if first else 0

                    events.append({
                        'date': real_date.strftime('%Y-%m-%d'),
                        'plant': str(plant.id),
                        'action': action,
                        'priority': priority,
                        'custom_info': None
                    })
                    real_date += interval
                    first = False

            for plant in Plant.objects.filter(user=user).iterator():

                calculate_events(plant, 'water',
                                 plant.last_watered, 
                                 plant.instruction.watering)

                calculate_events(plant, 'fertilize',
                                 plant.last_fertilized,
                                 plant.instruction.fertilizing)

            # custom events
            custom_events = CustomEvent.objects.filter(
                user=user,
                date__gte=upcoming_start_date,
                date__lte=upcoming_end_date
            )

            # FIXME update priority according to the PR with events history
            for event in custom_events.iterator():
                events.append({
                    'date': event.date,
                    'plant': str(event.plant.id),
                    'action': 'custom',
                    'priority': None,
                    'custom_info': {
                        'name': event.name,
                        'description': event.description
                    }
                })

        return Response(events, status=status.HTTP_200_OK)

    def post(self, request: Request):
        user: User = request.user
        serializer = EventCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            plant: Plant = Plant.objects.get(id=serializer.validated_data['plant'])
        except Model.DoesNotExist:
            return Response({
                'plant': ['plant does not exist']
            }, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        action = serializer.validated_data['action']
        event_date: datetime = serializer.validated_data['event_date']

        # notifier = Notifier()
        # ok = notifier.notify(
        #     user=user,
        #     plant=plant,
        #     subject='?',
        #     contents=['?', '?', '?', '?', '?', '?'],
        #     scheduled_datetime=event_date,
        #     action=action
        # )

        # if not ok:
        #     return Response(data={

        #     })

        if action == 'water':
            plant.last_watered = event_date.date()
        elif action == 'fertilize':
            plant.last_fertilized = event_date.date()

        plant.save()

        return Response(status=status.HTTP_200_OK)


class CustomEventsView(APIView):
    def post(self, request: Request):
        user: User = request.user
        serializer = CustomEventCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            plant: Plant = Plant.objects.get(id=serializer.validated_data['plant'])
        except Model.DoesNotExist:
            return Response({
                'plant': ['plant does not exist']
            }, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        event_date: date = serializer.validated_data['event_date']
        name: str = serializer.validated_data['name']
        description: str = serializer.validated_data['description']

        event: CustomEvent = CustomEvent.objects.create(
            id=uuid4(),
            user=user,
            plant=plant,
            date=event_date,
            name=name,
            description=description
        )

        event.save()

        return Response(status=status.HTTP_200_OK)
