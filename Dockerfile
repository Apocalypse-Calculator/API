FROM node:13-stretch

# Creating application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 9000
CMD ["yarn", "start"]