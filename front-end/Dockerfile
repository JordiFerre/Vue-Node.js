FROM node:lts-alpine AS builder

WORKDIR /vite

ARG VITE_BASE_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}

COPY . ./

RUN npm ci

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /vite/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
