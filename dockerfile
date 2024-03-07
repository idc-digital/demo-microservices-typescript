FROM node:19.5.0-alpine

COPY index.js ./

WORKDIR index.js ./

RUN npm install --force


EXPOSE 4000
CMD [ "node", "index.js" ]