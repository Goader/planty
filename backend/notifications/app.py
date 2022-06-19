from datetime import datetime
import logging
import pytz
import os

from fastapi import FastAPI, Response
from fastapi import Body, status

from dotenv import load_dotenv

from models import (
    ScheduleNotificationRequest,
    ScheduleNotificationResponse
)
from notifier import Notifier
from scheduler import Scheduler


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv('.env')

app = FastAPI(
    title='NotificationsScheduler',
    version='1.0',
    description='Scheduler for notifications by sending emails'
)

notifier = Notifier(os.getenv('MAIL_SERVICE_HOST'), os.getenv('MAIL_SERVICE_PORT'), 'send')
scheduler = Scheduler(notifier)
scheduler.run()


@app.post('/schedule', response_model=ScheduleNotificationResponse, status_code=200)
async def schedule(response: Response, body: ScheduleNotificationRequest = Body(...)):
    target = body.target
    subject = body.subject
    contents = body.contents

    scheduled = body.scheduled_datetime
    category = body.category

    user_uuid = body.user_uuid
    plant_uuid = body.plant_uuid

    logger.info(f'Scheduling "{subject}" {target} mail')

    try:
        utc = pytz.utc

        scheduled = datetime.strptime(scheduled, '%Y-%m-%d %H:%M:%S')
        scheduled = scheduled.replace(tzinfo=utc)

        if category == 'water':
            strategy = os.getenv('WATER_NOTIFICATION_STRATEGY', '0')
        elif category == 'insolation':
            strategy = os.getenv('INSOLATION_NOTIFICATION_STRATEGY', '0')
        elif category == 'fertilize':
            strategy = os.getenv('FERTILIZE_NOTIFICATION_STRATEGY', '0')
        elif category == 'custom':
            strategy = os.getenv('CUSTOM_NOTIFICATION_STRATEGY', '0')
        else:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": 'unknown category'}

        tags = [user_uuid, plant_uuid]

        scheduler.remove(tags)
        scheduler.schedule(scheduled, target, subject, contents, strategy, tags=tags)
        
    except Exception as ex:
        logger.exception(f'{type(ex).__name__}: {ex}')
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"message": f'{type(ex).__name__}: {ex}'}

    return {"message": "done"}