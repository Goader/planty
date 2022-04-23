from pathlib import Path
import sys
import os

from dotenv import load_dotenv

from scheduler import Scheduler
from notifier import Notifier
from listener import Listener


load_dotenv('.env')


def main():
    notifier = Notifier(os.getenv('MAIL_SERVICE_HOST'), os.getenv('MAIL_SERVICE_PORT'), 'send')
    scheduler = Scheduler(notifier)

    print(os.getenv('MONGO_HOST'))

    listener = Listener(scheduler,
                        os.getenv('MONGO_HOST'),
                        int(os.getenv('MONGO_PORT')),
                        os.getenv('MONGO_USERNAME'),
                        os.getenv('MONGO_PASSWORD'),
                        os.getenv('MONGO_DATABASE'),
                        os.getenv('MONGO_REPLICA_SET_NAME'))

    scheduler.run()
    listener.run()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)

