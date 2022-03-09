FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY writer.js ./

CMD ["npm", "run", "writer"]