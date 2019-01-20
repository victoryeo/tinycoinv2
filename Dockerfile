FROM node:11.1.0-alpine

RUN mkdir -p /usr/local/victor
WORKDIR /usr/local/victor

RUN apk --update add  git
RUN git clone -b master https://github.com/victoryeo/tinycoinv2.git
WORKDIR /usr/local/victor/tinycoinv2
RUN npm install 

EXPOSE 4040

ENTRYPOINT ["npm"]
CMD ["start"]
