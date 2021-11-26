FROM node:15.8.0-alpine

WORKDIR /client

COPY .env package*.json .babelrc webpack.config.js /client/

RUN npm i

COPY src/*.js src/*.html /client/src/
COPY src/assets/* /client/src/assets/
COPY src/components/FormQuestions/* /client/src/components/FormQuestions/
COPY src/components/* /client/src/components/
COPY src/containers/* /client/src/containers/
COPY src/pages/* /client/src/pages/
COPY src/utils/* /client/src/utils/

EXPOSE 8080

CMD [ "npm", "run", "build-docker" ]