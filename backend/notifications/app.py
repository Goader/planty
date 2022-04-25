from datetime import datetime
import logging
import pytz
import os

from fastapi import FastAPI
from fastapi import Body

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


@app.post('/schedule', response_model=ScheduleNotificationResponse)
async def schedule(body: ScheduleNotificationRequest = Body(...)):
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

        if category == 'watering':
            strategy = os.getenv('WATERING_NOTIFICATION_STRATEGY')
        else:
            return {"message": 'unkown category'}

        tags = [user_uuid, plant_uuid]

        scheduler.remove(tags)
        scheduler.schedule(scheduled, target, subject, contents, strategy, tags=tags)
        
    except Exception as ex:
        logger.exception(f'{type(ex).__name__}: {ex}')
        return {"message": f'{type(ex).__name__}: {ex}'}

    return {"message": "done"}