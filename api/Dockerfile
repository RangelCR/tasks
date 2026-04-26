FROM node:25.9-alpine3.22
WORKDIR /app
COPY . . 
RUN npm install
ENV PORT=3000
CMD [ "node", "index.js" ]