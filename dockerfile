FROM node:latest

COPY /demo-microservices-typescript/index.js .

WORKDIR index.js

RUN npm install


EXPOSE 4000
CMD [ "node", "index.js" ]