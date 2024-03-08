FROM node:19.5.0-alpine

COPY index.js ./

WORKDIR index.js ./

ADD package*.json /.

RUN NODE_ENV=development npm i

ADD . .

CMD node index.js


EXPOSE 4000
