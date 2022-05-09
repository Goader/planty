from datetime import date

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Instruction(models.Model):
    id = models.UUIDField(primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    species = models.CharField(max_length=50)

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
    photo = models.ImageField(upload_to='plants', default=None)
    other_info = models.CharField(max_length=400, blank=True, default="")

    last_watered = models.DateField(default=date.today)
    last_fertilized = models.DateField(default=date.today)

    class Meta:
        app_label = 'dashboard'


class EventsHistory(models.Model):
    id = models.UUIDField(primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

    action = models.CharField(max_length=50)
    date = models.DateField()


class CustomEvent(models.Model):
    id = models.UUIDField(primary_key=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)

    date = models.DateField()
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=400, default='')

    class Meta:
        app_label = 'dashboard'
