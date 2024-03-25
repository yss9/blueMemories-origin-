FROM node:21-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn builder

FROM nginx
EXPOSE 3000
COPY ./ngnix/default.conf /etc/ngnix/conf.d/default.conf
COPY --from=builder /app/builder /usr/share/nginx/html