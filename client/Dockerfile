FROM node:16 as build

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /etc/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
