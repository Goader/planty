import requests
import logging

logger = logging.getLogger(__name__)


class Notifier:
    def __init__(self, url: str, port: str, endpoint: str) -> None:
        self._url = url
        self._port = port
        self._endpoint = endpoint

    @property
    def mail_url(self) -> str:
        return f'http://{self._url}:{self._port}/{self._endpoint}'

    def notify(self, target: str, subject: str, content: str) -> None:
        response = requests.post(self.mail_url, json={
            'target': target,
            'subject': subject,
            'content': content
        })

        response_message = response.json()['message']

        if response_message != 'done':
            logger.error(f'Mail service error: "{response_message}"')
            # TODO should be reschedule it? (like for an hour or so..)
