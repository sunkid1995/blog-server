# blog-server
> tested on node v6 and above

# technology description 
> nodeJS 
> mongodb 
> express 
> (JWT) jsonwebtoken 
> lodash 
> body-parser

# technology support development
> nodemon 
> babel-cli 
> babel-preset-es2015 
> babel-preset-stage-2
> babel-register
> eslint
> eslint-config-google
> eslint-plugin-babel

# Getting started
> first ensure have node and mongodb installed on your system
> run mongodb
-> mongod = server initialize file database local
> runing file mongod --dbpath <-static file database->

# clone it
> git clone https://github.com/sunkid1995/blog-server.git
> cd Blogserver
> yarn install || npm install

# installed dependencies
> yarn || npm

# run it
> yarn dev || npm run dev

# build it
> yarn build & yarn start

# eslint test
> yarn eslint

# Yarn & Npm SCRIP DEV
> yarn dev -> start live reloading development server

# Yarn & Npm SCRIP PRODUCTION
yarn build -> generate production ready application in 'dist'
yarn start -> start live reloading production server

# Make it your own
> rm -rf .git 
> git init