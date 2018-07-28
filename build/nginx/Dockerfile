FROM nginx:latest
RUN apt-get update -qq && apt-get -y install apache2-utils
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]
