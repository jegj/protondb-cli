FROM node:18-alpine

LABEL maintainer="Javier Galarza <jegj57@gmail.com>"

RUN apk update && apk upgrade && rm -rf /var/apk/cache/*

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

COPY . /app
WORKDIR /app
ENV NODE_ENV production
RUN npm install --omit=dev

ENTRYPOINT ["node", "protondb-cli.js"]