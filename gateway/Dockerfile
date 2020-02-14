FROM node:10-alpine
RUN mkdir -p /home/server

WORKDIR /home/server
COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install
COPY  ./  /home/server
COPY  ./wait-for.sh /home/server
RUN ls /home/server

CMD ["node", "index.js" ]