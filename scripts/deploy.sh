#!/usr/bin/env bash
ECHO ONLY RUN FROM ROOT PROJECT DIRECTORY!

wait 10;


LOGIN="$(aws ecr get-login --region us-west-1)"
sudo $LOGIN
docker build -t desklight .
docker tag desklight:latest 419050778786.dkr.ecr.us-west-1.amazonaws.com/desklight:latest
docker push 419050778786.dkr.ecr.us-west-1.amazonaws.com/desklight:latest
