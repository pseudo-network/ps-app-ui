# build environment
FROM node:current-alpine as build
WORKDIR /tf-site-ui
ENV PATH /tf-site-ui/node_modules/.bin:$PATH
COPY package.json /tf-site-ui/package.json
RUN yarn install --silent
RUN npm global add react-scripts@4.0.1 --silent
COPY . /tf-site-ui
RUN npm run build
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /tf-site-ui/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]