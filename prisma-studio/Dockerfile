# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine3.17
WORKDIR /app

COPY prisma-studio/package.json package.json
COPY src/prisma prisma
RUN npm install
RUN npx prisma generate

EXPOSE 5555

CMD npx prisma studio --port 5555 --browser none