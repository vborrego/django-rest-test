#!/bin/sh
cd /app
python3 -m venv /app/venv
source venv/bin/activate
python3 manage.py runserver 0.0.0.0:8000
