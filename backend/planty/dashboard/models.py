from datetime import date

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Instruction(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=50)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    species = models.CharField(max_length=50)

    watering = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    insolation = models.CharField(max_length=50)
    fertilizing = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    publicated = models.BooleanField(default=False)
    public = models.BooleanField(default=False)
    num_selected = models.PositiveIntegerField(default=0)

    class Meta:
        app_label = 'dashboard'


class Plant(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instruction = models.ForeignKey(Instruction, on_delete=models.PROTECT)

    name = models.CharField(max_length=50)
    species = models.CharField(max_length=50)
    photo_url = models.URLField(blank=True, null=True)
    other_info = models.CharField(max_length=400, blank=True, default="")

    last_watered = models.DateField(default=date.today)
    last_fertilized = models.DateField(default=date.today)

    class Meta:
        app_label = 'dashboard'
