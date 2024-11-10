FROM nginx

WORKDIR /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf

RUN apt-get update         && \
    apt-get install -y vim

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 8080