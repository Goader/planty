from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Instruction(models.Model):
    id = models.UUIDField(primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    species = models.CharField(primary_key=True, max_length=50)

    watering = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    insolation = models.CharField(max_length=50)
    fertilizing = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    class Meta:
        app_label = 'dashboard'


class Plant(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # TODO should we really not let delete the instruction, unless it is unused?
    instruction = models.ForeignKey(Instruction, on_delete=models.PROTECT)

    name = models.CharField(max_length=50)
    species = models.CharField(max_length=50)
    photo_url = models.URLField(blank=True, null=True)
    other_info = models.CharField(max_length=400, blank=True, default="")

    class Meta:
        app_label = 'dashboard'
