FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY reader.js ./

CMD ["npm", "run", "reader"]