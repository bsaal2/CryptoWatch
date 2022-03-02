FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine

# Copying the nginx configuration
COPY build/default.conf /etc/nginx/conf.d/

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]