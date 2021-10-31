FROM nginx

# Base config
RUN mkdir /bobhare
WORKDIR /bobhare
COPY scripts/docker/start.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/start.sh

# Nginx config
COPY scripts/docker/nginx/ /etc/nginx/

# Front part
RUN mkdir front
COPY front/dist/ front

# Back part
RUN mkdir back
COPY back/bin/bobhare back/
RUN chmod -R +x back/bobhare

EXPOSE 80
