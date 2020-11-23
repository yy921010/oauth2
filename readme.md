# oauth2-nodejs-sample

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[中文](https://github.com/yy921010/oauth2-koa2/blob/master/readme-zh.md)

## Background
Using the example made by koa2 and oauth2, the project uses mongodb and redis for data management, in which mongodb performs data query, and redis manages the token in oauth2;

## Installation
This project uses node and npm. Please make sure you install them locally
-Use npm
```bash
$ npm i
```
-Or yarn, of course tyarn is recommended for inland China

```bash
$ npm install yarn -g

```
```bash
$ yarn
```

## How to run

### Run
```bash
$ yarn run start
```
### Pack and run

```bash
$ yarn run prod # Need to install pm2
```

-Access in browser

```
http://localhost:7001
```

## Project structure

    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- app.js
    |-- package.json
    |-- readme-zh.md
    |-- readme.md
    |-- bin
    | |-- www
    |-- public
    |-- src
    | |-- config
    | | |-- index.js
    | |-- mongoose
    | | |-- index.js
    | | |-- models
    | | |-- clientModel.js
    | | |-- userModel.js
    | |-- oauth
    | | |-- compatibleTokenError.js
    | | |-- errorCode.js
    | | |-- index.js
    | | |-- model.js
    | |-- redis
    | | |-- index.js
    | |-- routes
    | | |-- index.js
    | | |-- router.spec.js
    | |-- utils
    | |-- errorHandle.js
    | |-- httpException.js
    | |-- log4j.js
    | |-- res.js
    | |-- tool.js
    | |-- tool.spec.js
    |-- test
        |-- restClient.http

### Structure description
- config: configuration file, please refer to [ioredis](https://github.com/luin/ioredis), [log4js](https://log4js-node.github.io/log4js-node/), [ mongoosejs](https://mongoosejs.com/docs/guide.html)
- mongoose: Process all operations of mongoose
- oauth: handle oauth2 authentication, currently supported modes are: password and refresh_token
- redis: Process redis requests
- routes: Process routing
- util: all tools
- test/restClient.http: simple request example

## Maintainer
[@yy921010](https://github.com/yy921010)

## How to contribute
You are very welcome to join! Mention a [Issue](https://github.com/yy921010/oauth2-koa2/issues/new) or submit a Pull Request.
The standard Readme follows the [Contributor Covenant](https://www.contributor-covenant.org/version/1/3/0/code-of-conduct/) code of conduct.

## License
[MIT](https://github.com/yy921010/oauth2-koa2/blob/master/LICENSE) @yy921010