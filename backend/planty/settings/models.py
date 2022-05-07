from django.db import models
from django.contrib.auth.models import User


class Settings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    account_notifications = models.BooleanField()
    watering_notifications = models.BooleanField()
    forum_notifications = models.BooleanField()

    class Meta:
        app_label = 'settings'