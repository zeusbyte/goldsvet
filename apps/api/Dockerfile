FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY apps/api/package*.json ./
RUN npm install --omit=dev

COPY apps/api/src ./src

USER node
EXPOSE 3000

CMD ["node", "src/server.js"]
