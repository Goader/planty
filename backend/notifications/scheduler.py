from datetime import datetime
import logging

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.job import Job

from notifier import Notifier
from trigger import PolicyTrigger

logger = logging.getLogger(__name__)


class Scheduler:
    def __init__(self, notifier: Notifier) -> None:
        executors = {
            'default': ThreadPoolExecutor(4)
        }
        self._scheduler = BackgroundScheduler(executors=executors)
        self._notifier = notifier

        self._scheduled_jobs: dict[str, set] = dict()

    def schedule(self, timestamp: datetime, target: str, subject: str, messages: list[str], notification_strategy: str, tags: list[str] = []):

        # job function
        def job(target: str, subject: str, message: str):
            self._notifier.notify(target, subject, message)

        # scheduling
        rules = notification_strategy.split(';')
        assert len(messages) == len(rules), 'the amount of notification messages is not equal to the count of rules'

        # scheduling the corresponding message
        for rule, message in zip(rules, messages):
            trigger = PolicyTrigger(rule, zero_date=timestamp)
            job: Job = self._scheduler.add_job(job, trigger=trigger, args=[target, subject, message])

            for tag in tags:
                self._scheduled_jobs[tag] = self._scheduled_jobs.get(tag, set()) | set([job.id])

    def remove(self, tags: list[str]):
        """Removes all the jobs which have all the tags specified in the tags argument"""
        if not tags:
            raise ValueError('list of tags cannot be empty')

        jobs = self._scheduled_jobs[tags[0]]
        for tag in tags:
            jobs = jobs & self._scheduled_jobs[tag]

        for job_id in jobs:
            self._scheduler.remove_job(job_id)

    def run(self):
        self._scheduler.start()
