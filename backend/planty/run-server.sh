#!/bin/bash

python3 manage.py makemigrations
python3 manage.py makemigrations dashboard
python3 manage.py makemigrations settings
python3 manage.py makemigrations users

python3 manage.py migrate

uvicorn planty.asgi:application --host 0.0.0.0 --port 3001
