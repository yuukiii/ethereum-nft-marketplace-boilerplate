FROM node:17.2.0
WORKDIR /usr/src/app
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start-container"]
