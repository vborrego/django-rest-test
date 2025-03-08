FROM alpine:3.21.3
RUN apk add --update --no-cache python3 curl wget sqlite nodejs npm 
RUN mkdir /app
COPY . /app/
RUN cd /app/ && sh build.sh 
EXPOSE 80 22 8000 8001
CMD ["sh","/app/start.sh"]
#CMD ["cat"]
