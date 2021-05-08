FROM node:13

USER node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]