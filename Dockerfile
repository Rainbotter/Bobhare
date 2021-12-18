FROM node:16-alpine

RUN mkdir /app
RUN mkdir /data
WORKDIR /app

COPY dist /app
COPY package.json /app
COPY LICENSE /app

RUN npm install

ENV DATABASE_PATH /data/db.sqlite3

CMD node server.js
EXPOSE 3000
