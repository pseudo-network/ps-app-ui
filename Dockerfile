# build environment
FROM node:current-alpine as build
WORKDIR /ps-app-ui
ENV PATH /ps-app-ui/node_modules/.bin:$PATH
COPY package.json /ps-app-ui/package.json
RUN npm install
RUN npm global add react-scripts@4.0.1
COPY . /ps-app-ui
RUN npm run build
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /ps-app-ui/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]