from datetime import datetime
from typing import List
import os
import requests

from django.contrib.auth.models import User
from django.conf import settings

from .models import Plant


class Notifier:
    def __init__(self) -> None:
        self._notifier_endpoint = settings.NOTIFIER_ENDPOINT

    def notify(
            self, 
            user: User,
            plant: Plant,
            subject: str,
            contents: List[str],
            scheduled_datetime: datetime,
            action: str) -> bool:
        
        response = requests.post(self._notifier_endpoint, json={
            'target': user.email,
            'subject': subject,
            'contents': contents,
            'scheduled_datetime': scheduled_datetime.strftime("%Y-%m-%d %H-%M-%S"),
            'category': action,
            'user_uuid': str(user.id),
            'plant_uuid': str(plant.id)
        })

        return response.ok
