#!/bin/sh
cd /app
python3 -m venv /app/venv
source venv/bin/activate
pip install --upgrade pip
pip install djangorestframework tzdata
echo Build react app
npm install
./node_modules/typescript/bin/tsc
node ./node_modules/webpack/bin/webpack.js --config webpack.config.js
mkdir -p static/app/dist/
cp main.html static/app/
cp dist/bundle.js static/app/dist/
cp main.css static/app/dist/

echo Migrate and run django rest app
python3 manage.py migrate
echo Configure admin user
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', ' admin@example.com', '12345678')" | python3 manage.py shell
