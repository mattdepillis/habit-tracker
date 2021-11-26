FROM node:15.8.0-alpine

WORKDIR /server

COPY .env package*.json /server/

RUN npm i

COPY app.js knexfile.js /server/
COPY controllers/*.js /server/controllers/
COPY routes/*.js /server/routes/

EXPOSE 3001

CMD ["npm", "start"]