FROM node:10.20.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD ["node","app.js"]

