from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .validators import (
    MinValueValidator,
    InsolationValidator
)


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
        if 'used_instruction' not in data or (
                'watering' not in data \
                    and 'insolation' not in data \
                    and 'fertilizing' not in data
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
    insolation = serializers.CharField(required=False, validators=[InsolationValidator()])
    fertilizing = serializers.IntegerField(required=False, validators=[MinValueValidator(1)])

    other_info = serializers.CharField(required=False, max_length=400)


class PlantDeleteSerializer(serializers.Serializer):
    id = serializers.UUIDField()
