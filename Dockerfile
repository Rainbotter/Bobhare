FROM golang:alpine

# Base config
RUN mkdir /app
RUN mkdir /data
WORKDIR /app

COPY bin .
RUN chmod -R +x bobhare

CMD ./bobhare
EXPOSE 9000
