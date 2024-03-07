FROM node:19.5.0-alpine

COPY index.js ./

WORKDIR index.js ./

COPY package*.json ./

USER node

RUN npm install express

COPY --chown=node:node . .


EXPOSE 4000
CMD [ "node", "index.js" ]