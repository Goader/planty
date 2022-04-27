from djongo import models

# Create your models here.
from djongo.models import ObjectIdField


class Plant(models.Model):
    class Meta:
        abstract = True

    plant_id = models.CharField()
    name = models.CharField(max_length=50)
    photo_url = models.URLField(blank=True, null=True)
    species = models.CharField(max_length=50, blank=True, default="")

    watering = models.CharField(max_length=50, blank=True, default="")
    insolation = models.CharField(max_length=50, blank=True, default="")
    fertilizing = models.CharField(max_length=50, blank=True, default="")

    other_info = models.CharField(max_length=400, blank=True, default="")


class UserPlants(models.Model):
    class Meta:
        app_label = 'UserPlants'

    _id = ObjectIdField()
    username = models.CharField(max_length=30, primary_key=True)
    plant_collection = models.ArrayField(model_container=Plant)
    objects = models.DjongoManager()

