FROM node:21-alpine

WORKDIR /frontend

COPY package.json /frontend/
RUN npm install

COPY public/ /frontend/public
COPY src/ /frontend/src
