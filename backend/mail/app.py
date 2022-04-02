from pathlib import Path
import logging

from fastapi import FastAPI
from fastapi import Body

from models import (
    SendMailRequest,
    SendMailResponse
)
from mail import Mail


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


app = FastAPI(
    title='MailServer',
    version='1.0',
    description='Mail server acting as a relay for GMail account'
)

mail = Mail()


@app.get('/send', response_model=SendMailResponse)
async def extract_entities(body: SendMailRequest = Body(...)):
    target = body.target
    subject = body.subject
    content = body.content

    logger.info(f'Sending "{subject}" mail to {target}')

    try:
        mail.send(target, subject, content)
    except Exception as ex:
        return {"message": str(ex)}

    logger.info('Successfully sent!')

    return {"message": "done"}