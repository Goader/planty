from rest_framework import serializers


class DefaultInstructionsSerializer(serializers.ModelSerializer):
    watering_days = serializers.IntegerField()
    fertilizing_days = serializers.IntegerField()
    insolation = serializers.CharField(max_length=50)