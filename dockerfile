FROM node:latest

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "node", "./demo-microservices-typescript/index.js" ]