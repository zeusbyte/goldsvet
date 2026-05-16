FROM node:20-alpine AS build

WORKDIR /app

COPY apps/frontend/package*.json ./
RUN npm install

COPY apps/frontend/ ./
COPY slot.png public/slot.png

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1:8080/health | grep -q ok
