# Spacy seems to be incompatible with alpine
FROM ubuntu
RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt install -y python3 python3-pip nodejs npm
RUN pip3 install spacy
RUN python3 -m spacy download de_core_news_sm
RUN adduser noroot
USER noroot
WORKDIR /home/noroot
COPY backend backend
COPY frontend frontend
USER root
RUN chown -R noroot /home/noroot
USER noroot
WORKDIR /home/noroot/frontend
RUN npm install
RUN npm run build
WORKDIR /home/noroot/backend
RUN npm install
CMD ["npm", "start"]
