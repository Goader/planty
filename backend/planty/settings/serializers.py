from rest_framework import serializers


class SettingsCreateSerializer(serializers.Serializer):
    account_notifications = serializers.BooleanField(required=False)
    watering_notifications = serializers.BooleanField(required=False)
    forum_notifications = serializers.BooleanField(required=False)

    def validate(self, data: dict):
        if ('account_notifications' not in data and
            'watering_notifications' not in data and
                'forum_notifications' not in data):

            raise serializers.ValidationError(
                'No fields found for settings creation/update.')

        return data
