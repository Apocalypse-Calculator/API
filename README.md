# Restock API

This is the backend of the restock app where support, the server is deployed as a netlify function.

## Local Environment Setup

1. `git clone git@github.com:Apocalypse-Calculator/API.git`
2. npm i -g yarn
3. yarn install
4. create .env file ( you can use the template) and provide the credentials of the mongodb instance
5. if you want to run your app locally:
   i. `yarn build`
   ii. `yarn start`

6. Once you start the environment your apis would be served on : `http://localhost:9000/.netlify/functions/{your-function-name}`

## Folder organization

Netlify looks at the js files in the `functions` directory and declares those to be the functions to generate.

In the root level of that folder the js files represent the routes that you can hit.

Currently there exist these routes:

## ping

supported by the `pinging` service, this route returns a status of the database, the intention is just to make sure the setup is live.

## users

supported by the `authorizing` service, this function has routes to handle registration and authentication.

## Postman Collections

To make it easier to share api endpoints, I created a postman collection with all the requests we support so far.

- they are located in the `docs` folder
- collections.json is for the collections , it includes the requests, with the example
- RESTOCK_LOCAL_ENV/ RESTOCK_PROD_ENV are two files that set the environment variable so you can re-use the same api calls on local environment or production

## Development and Deployment

- once you merge a branch into master netlify will automatically pick it up and deploy it to our production instance.
