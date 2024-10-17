FROM node:lts-alpine

WORKDIR /api

COPY . ./

RUN npm ci

EXPOSE 3000

CMD [ "node", "index.js" ]
