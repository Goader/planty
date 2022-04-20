from django.db import models

class DefaultInstructions(models.Model):
    """ watering_days - number of days until the next watering
        fertilizing_days - number of days until the next fertilizing
        insolation - type of insolation """

    watering_days = models.IntegerField()
    fertilizing_days = models.IntegerField()
    insolation = models.CharField(max_length=50)
