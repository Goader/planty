from datetime import date, datetime

from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .models import Instruction, Plant
from .validators import (
    MinValueValidator,
    InsolationValidator
)


# class PlantSerializer(serializers.Serializer):
#     class Meta:
#         model = Plant
#         fields = ['id', 'name', 'photo_url', 'species', 'other_info']


# class InstructionSerializer(serializers.Serializer):
#     class Meta:
#         model = Instruction
#         fields = ['watering', 'insolation', 'fertilizing']


class PlantCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    species = serializers.CharField(max_length=50)
    image = Base64ImageField(required=False, default=None)

    used_instruction = serializers.UUIDField(required=False)
    watering = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])
    insolation = serializers.CharField(required=False, validators=[InsolationValidator()])
    fertilizing = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])

    other_info = serializers.CharField(required=False, max_length=400, default='')

    def validate(self, data: dict):
        if 'used_instruction' not in data and (
                'watering' not in data \
                    or 'insolation' not in data \
                    or 'fertilizing' not in data
            ):

            raise serializers.ValidationError('you must either specify the used instruction or fill the fields for a new one')

        return data


class PlantUpdateSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField(required=False, max_length=50)
    species = serializers.CharField(required=False, max_length=50)
    image = Base64ImageField(required=False)

    used_instruction = serializers.UUIDField(required=False)
    watering = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])
    # TODO change to ChoiceField for insolation
    insolation = serializers.CharField(required=False, validators=[InsolationValidator()])
    fertilizing = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])

    other_info = serializers.CharField(required=False, max_length=400)


class PlantDeleteSerializer(serializers.Serializer):
    id = serializers.UUIDField()


class TimeSpanSerializer(serializers.Serializer):
    start_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])
    end_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])

    def validate(self, data: dict):
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError('end_date must occur after start_date')

        return data


class EventCreateSerializer(serializers.Serializer):
    event_date = serializers.DateTimeField(required=False, default=datetime.now)
    plant = serializers.UUIDField()
    # TODO add move when there is a possibility to add custom events
    action = serializers.ChoiceField(['water', 'fertilize'])
    message = serializers.CharField(required=False, max_length=400, default='')


class InstructionCreateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, max_length=50)

    species = serializers.CharField(required=False, max_length=50)

    watering = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])
    insolation = serializers.CharField(required=False, max_length=50)
    fertilizing = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])


class InstructionUpdateSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField(required=False, max_length=50)

    species = serializers.CharField(required=False, max_length=50)

    watering = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])
    insolation = serializers.CharField(required=False, max_length=50)
    fertilizing = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])
