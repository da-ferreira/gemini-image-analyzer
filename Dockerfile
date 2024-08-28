FROM node:20.12.2 as build

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]