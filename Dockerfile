FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn config set network-timeout 300000

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]
