FROM node:19.5.0-alpine

COPY index.js ./

WORKDIR index.js ./

ADD package*.json /.

RUN npm install

ADD . .

CMD node index.js


EXPOSE 4000
