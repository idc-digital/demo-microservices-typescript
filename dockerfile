FROM node:10-alpine

COPY index.js ./

WORKDIR index.js ./

RUN NODE_ENV=development npm i


EXPOSE 4000
CMD [ "node", "index.js" ]