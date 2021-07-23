FROM alpine:3.14 
RUN apk add --update --no-cache python3 curl wget sqlite nodejs npm 
RUN mkdir /app
RUN cd /app && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN cd app/ && python3 get-pip.py && pip install djangorestframework
EXPOSE 80 22 8000 8001
CMD ["sh","/app/start.sh"]
