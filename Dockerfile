FROM node:13

USER node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]