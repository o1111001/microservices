FROM node:10-alpine
RUN mkdir -p /home/services/bloggers_service/

WORKDIR /home/services/bloggers_service/
COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

COPY  . .

CMD [ "node", "index.js" ]
