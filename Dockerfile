FROM node:20.16.0-alpine3.20

USER root 

WORKDIR /app


COPY package*.json tsconfig.json ./
RUN npm i
COPY . .
RUN npm run tsc -b

EXPOSE 3000
CMD ["npm","run","dev"]

