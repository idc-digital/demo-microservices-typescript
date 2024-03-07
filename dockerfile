FROM node:19.5.0-alpine

COPY index.js ./

WORKDIR index.js ./

COPY package*.json ./


RUN node index.js ./


EXPOSE 4000
CMD [ "node", "index.js" ]