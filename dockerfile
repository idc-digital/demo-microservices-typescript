FROM node:latest

COPY /index.js .

WORKDIR index.js

RUN npm install


EXPOSE 4000
CMD [ "node", "index.js" ]