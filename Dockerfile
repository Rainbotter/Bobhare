FROM alpine

# Base config
RUN mkdir /app
RUN mkdir /data
WORKDIR /app

COPY target .
RUN chmod -R +x bobhare

CMD ./bobhare
EXPOSE 9000
