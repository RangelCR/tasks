FROM node:25-alpine3.22
WORKDIR /app
COPY . . 
RUN npm install
ENV DB_HOST="post"
ENV DB_PORT=5432
ENV DB_USER="todo_user"
ENV DB_PASSWORD="senha123"
ENV DB_NAME="todos"
ENV PORT=3000
CMD [ "node", "index.js" ]