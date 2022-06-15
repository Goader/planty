from datetime import timedelta, date, datetime, time
from uuid import uuid4
from math import ceil
from django.conf import settings
import os

from django.contrib.auth.models import User
from django.db.models import Model
from django.conf import settings

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from .utils import crop_photo
from .notifier import Notifier
from .models import Plant, Instruction, EventsHistory, CustomEvent
from .serializers import (
    EventHappenedSerializer,
    CustomEventCreateSerializer,
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
                'photo_url': plant.photo.url if plant.photo.name else None,
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

        if 'used_instruction' in data:
            try:
                instruction = Instruction.objects.get(pk=data['used_instruction'])
            except Instruction.DoesNotExist:
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
            photo=data['photo'],
            other_info=request.data.get('other_info', '')
        )
        new_plant.save()

        photo_filepath = os.path.join(settings.MEDIA_ROOT, new_plant.photo.name)
        crop_photo(photo_filepath)

        return Response(status=status.HTTP_201_CREATED)

    def put(self, request):
        user: User = request.user
        serializer = PlantUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            plant: Plant = Plant.objects.get(pk=data['id'])
        except Plant.DoesNotExist:
            return Response(data={
                'id': ['Plant with the given ID does not exist']
            }, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if 'used_instruction' in data:
            try:
                data['used_instruction'] = Instruction.objects.get(pk=data['used_instruction'])
            except Instruction.DoesNotExist:
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
        plant.photo = data.get('photo', plant.photo)
        plant.other_info = data.get('other_info', plant.other_info)

        plant.save()

        photo_filepath = os.path.join(settings.MEDIA_ROOT, plant.photo.name)
        crop_photo(photo_filepath)

        return Response(status=status.HTTP_200_OK)

    def delete(self, request):
        user: User = request.user
        serializer = PlantDeleteSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            plant: Plant = Plant.objects.get(pk=data['id'])
        except Plant.DoesNotExist:
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

            history = EventsHistory.objects.filter(
                user=user,
                date__gte=history_start_date,
                date__lte=history_end_date
            )

            for event in history.iterator():
                if event.action == 'custom':
                    event_id = event.id

                    try:
                        custom_event: CustomEvent = CustomEvent.objects.get(id=event_id)
                        custom_info = {
                            'name': custom_event.name,
                            'description': custom_event.description
                        }
                    except CustomEvent.DoesNotExist:
                        # TODO or should we simply skip this?
                        event_id = None
                        custom_info = None

                else:
                    event_id = None
                    custom_info = None

                events.append({
                    'id': event_id,
                    'date': event.date,
                    'plant': str(event.plant.id),
                    'action': event.action,
                    'days_late': None,
                    'interval': None,
                    'happened': True,
                    'custom_info': custom_info
                })

        # upcoming events
        if end_date >= today:
            upcoming_start_date = max(today, start_date)
            upcoming_end_date = end_date

            def calculate_events(plant: Plant, action: str, last: date, days_interval: int):
                interval = timedelta(days=days_interval)
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
                    days_late = max(0, (today - planned_date).days) if first else 0

                    events.append({
                        'id': None,
                        'date': real_date.strftime('%Y-%m-%d'),
                        'plant': str(plant.id),
                        'action': action,
                        'days_late': days_late,
                        'interval': days_interval,
                        'happened': False,
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
                date__lte=upcoming_end_date,
                happened=False
            )

            for event in custom_events.iterator():
                events.append({
                    'id': event.id,
                    'date': max(today, event.date),
                    'plant': str(event.plant.id),
                    'action': 'custom',
                    'days_late': max(0, (today - event.date).days),
                    'interval': None,
                    'happened': False,
                    'custom_info': {
                        'name': event.name,
                        'description': event.description
                    }
                })

        return Response(events, status=status.HTTP_200_OK)

    def post(self, request: Request):
        user: User = request.user
        serializer = EventHappenedSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            plant: Plant = Plant.objects.get(id=serializer.validated_data['plant'])
        except Plant.DoesNotExist:
            return Response({
                'plant': ['plant does not exist']
            }, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        action = serializer.validated_data['action']
        event_date: datetime = serializer.validated_data['event_date']

        # if there is no time in the date add the current (time is needed for notifier)
        if event_date.time() == time():
            time_now = datetime.now().time()
            event_date = event_date.replace(
                hour=time_now.hour,
                minute=time_now.minute,
                second=time_now.second
            )

        notifier = Notifier()
        ok = notifier.notify(
            user=user,
            plant=plant,
            subject=settings.NOTIFIER_SUBJECTS[action],
            contents=[
                message.format(plant_name=plant.name)
                for message in settings.NOTIFIER_CONTENTS[action]
            ],
            scheduled_datetime=event_date,
            action=action
        )

        if not ok:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if action != 'custom':
            if action == 'water':
                plant.last_watered = event_date.date()
            elif action == 'fertilize':
                plant.last_fertilized = event_date.date()

            plant.save()

            history_event = EventsHistory.objects.create(
                id=uuid4(),
                user=user,
                plant=plant,
                action=action,
                date=event_date.date()
            )

        else:
            event_id = serializer.validated_data['id']

            try:
                custom_event: CustomEvent = CustomEvent.objects.get(id=event_id)
            except CustomEvent.DoesNotExist:
                return Response({
                    'id': ['event does not exist']
                }, status=status.HTTP_404_NOT_FOUND)

            custom_event.happened = True
            custom_event.save()

            history_event = EventsHistory.objects.create(
                id=event_id,
                user=user,
                plant=plant,
                action=action,
                date=event_date.date()
            )

        history_event.save()

        return Response(status=status.HTTP_200_OK)


class CustomEventsView(APIView):
    def post(self, request: Request):
        user: User = request.user
        serializer = CustomEventCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            plant: Plant = Plant.objects.get(id=serializer.validated_data['plant'])
        except Plant.DoesNotExist:
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

        notifier = Notifier()
        ok = notifier.notify(
            user=user,
            plant=plant,
            subject=settings.NOTIFIER_SUBJECTS['custom'],
            contents=[
                message.format(plant_name=plant.name)
                for message in settings.NOTIFIER_CONTENTS['custom']
            ],
            scheduled_datetime=event_date,
            action='custom'
        )

        if not ok:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_200_OK)


class PlantView(APIView):
    def get(self, request: Request, id):
        user: User = request.user

        try:
            plant: Plant = Plant.objects.get(pk=id)
        except Plant.DoesNotExist:
            return Response(data={'id': ['Plant with the given ID does not exist']}, status=status.HTTP_404_NOT_FOUND)

        if plant.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        plant_json = plant.values()
        plant_json["events"] = []

        today = date.today()
        # next watering event
        planned_watering = plant.last_watered + timedelta(plant.instruction.watering)
        days_late = max(0, (today - planned_watering).days)
        plant_json["events"].append({
            'id': None,
            'date': max(planned_watering, today),
            'action': "water",
            'days_late': days_late,
            'interval': plant.instruction.watering,
            'happened': False,
            'custom_info': None
        })
        # next fertilizing event
        planned_fertilizing = plant.last_fertilized + timedelta(plant.instruction.fertilizing)
        days_late = max(0, (today - planned_fertilizing).days)
        plant_json["events"].append({
            'id': None,
            'date': max(planned_fertilizing, today),
            'action': "fertilize",
            'days_late': days_late,
            'interval': plant.instruction.fertilizing,
            'happened': False,
            'custom_info': None
        })

        custom_events = CustomEvent.objects.filter(plant=plant)
        custom_events = [{
            'id': event.id,
            "date": max(today, event.date),
            'days_late': max(0, (today - event.date).days),
            'action': 'custom',
            'interval': None,
            'happened': False,
            'custom_info': {
                'name': event.name,
                'description': event.description
            }
        } for event in custom_events if not event.happened]
        print(custom_events)
        plant_json["events"].extend(custom_events)

        return Response(plant_json, status=status.HTTP_200_OK)
