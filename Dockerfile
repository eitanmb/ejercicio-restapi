FROM node:alpine3.14

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"] 