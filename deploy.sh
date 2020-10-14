#!/bin/bash

if [[ "$(docker images -q scur 2> /dev/null)" == "" ]]; then
  docker build --no-cache -t scur .
fi

docker kill nlpmarkierung
docker rm nlpmarkierung

docker run -d -p $2:$2 \
-e REACT_APP_HOSTNAME=$1 \
-e PORT=$2 \
--restart unless-stopped \
--name nlpmarkierung  \
scur
