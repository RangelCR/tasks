FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apk update && apk upgrade
RUN addgroup -S node_group && adduser -S node_user -G node_group
RUN mkdir -p /app/tmp && chown -R node_user:node_group /app/tmp
EXPOSE 5000
USER node_user
CMD [ "node", "server.js" ]