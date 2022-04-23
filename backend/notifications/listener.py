import logging

import pymongo

from scheduler import Scheduler


logger = logging.getLogger(__name__)


class Listener:
    def __init__(self, scheduler: Scheduler, host: str, port: int, username: str, password: str, database: str, replica_set: str) -> None:
        self._scheduler = scheduler

        self._database = database

        self._client = pymongo.MongoClient(host=host, 
                                           port=port, 
                                           username=username, 
                                           password=password, 
                                           replicaSet=replica_set, 
                                           read_preference=pymongo.ReadPreference.PRIMARY)
        self._db = self._client[database]
        self._users = self._db['users']

    def run(self):
        try:
            with self._db.watch(
                    [{'$match': {'operationType': 'insert'}}]) as stream:
                for insert_change in stream:
                    print(insert_change)
        except pymongo.errors.PyMongoError as ex:
            logging.exception(ex)
