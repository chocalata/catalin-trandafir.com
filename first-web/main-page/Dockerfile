FROM node:20
RUN apt update && apt -y upgrade
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src/ /usr/src/app/
RUN npm install --production
EXPOSE 3001
CMD [ "npm", "run", "start"]