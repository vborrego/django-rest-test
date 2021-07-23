FROM alpine:3.14 
RUN apk add --update --no-cache python3 curl wget sqlite
RUN mkdir /app
RUN cd /app && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN cd app/ && python3 get-pip.py && pip install djangorestframework
# RUN ls app/
# RUN cd app/ && python3 manage.py migrate
# RUN cd app/ && echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', ' admin@example.com', '12345678')" | python3 manage.py shell
EXPOSE 80 22 8000 8001
CMD ["sh","/app/start.sh"]
#CMD ["python3","/app/manage.py","runserver","0.0.0.0:8000"]
#CMD ["cat"]