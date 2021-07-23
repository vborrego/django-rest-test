#!/bin/sh
cd /app
python3 manage.py migrate
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', ' admin@example.com', '12345678')" | python3 manage.py shell
python3 manage.py runserver 0.0.0.0:8000
