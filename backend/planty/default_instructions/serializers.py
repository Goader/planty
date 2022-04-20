from rest_framework import serializers


class DefaultInstructionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = DefaultInstructions
        fields = ('watering_days', 'fertilizing_days', 'insolation')
