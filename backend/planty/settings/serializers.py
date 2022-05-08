from rest_framework import serializers


class SettingsUpdateSerializer(serializers.Serializer):
    account_notifications = serializers.BooleanField(required=True)
    watering_notifications = serializers.BooleanField(required=True)
    forum_notifications = serializers.BooleanField(required=True)