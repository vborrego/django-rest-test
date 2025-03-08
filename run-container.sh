#!/bin/sh
#docker run -p 8001:8000 -d -it --rm --name env-docker-djangorest-container --mount type=bind,source="$(pwd)"/target,target=/app env-docker-djangorest-image
#docker run -p 8001:8000 -it --rm --name env-docker-djangorest-container --mount type=bind,source="$(pwd)"/target,target=/app env-docker-djangorest-image
docker run -p 8001:8000 -it --rm --name env-docker-djangorest-container env-docker-djangorest-image
