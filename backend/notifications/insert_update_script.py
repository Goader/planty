import os

import pymongo
from dotenv import load_dotenv


load_dotenv('.env')


if __name__ == '__main__':
    client = pymongo.MongoClient(host=os.getenv('MONGO_HOST'), port=int(os.getenv('MONGO_PORT')), username=os.getenv('MONGO_USERNAME'), password=os.getenv('MONGO_PASSWORD'))
    db = client[os.getenv('MONGO_DATABASE')]
    users = db['users']

    users.insert_one({'username1' : {
        'plants': [
            {
                'plant_name': 'Aloe Vera',
                'last_watered': 'some time'
            }
        ]
    }})

