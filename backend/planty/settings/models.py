from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Settings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    account_notifications = models.BooleanField(default=True)
    watering_notifications = models.BooleanField(default=True)
    forum_notifications = models.BooleanField(default=True)

    def values(self):
        return {
            "account_notifications": self.account_notifications,
            "watering_notifications": self.watering_notifications,
            "forum_notifications": self.forum_notifications
        }

    class Meta:
        app_label = 'settings'


@receiver(post_save, sender=User)
def create_user_settings(sender, instance, created, **kwargs):
    if created:
        Settings.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_settings(sender, instance, **kwargs):
    instance.settings.save()
