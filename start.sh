#!/bin/bash

cp ./.env.example .env
cp .env ./users_service
cp .env ./bloggers_service
cp .env ./gateway

docker-compose up -d
