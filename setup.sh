#!/bin/bash

docker compose up backend-db
chmod +x backend/mvnw
backend/mvnw package -f backend/pom.xml
docker compose up --build -d
