FROM alpine
RUN apk add --no-cache \
py3-pip nodejs yarn
RUN pip3 install spacy
RUN adduser noroot
USER noroot
WORKDIR /home/noroot
COPY backend .
COPY frontend .
WORKDIR /home/noroot/backend
RUN yarn install
WORKDIR /home/noroot/frontend
RUN yarn install
RUN yarn build
