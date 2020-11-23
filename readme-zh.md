# oauth2-nodejs-sample

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## 背景
使用koa2和 oauth2 制成的示例，该项目使用 mongodb 和 redis 进行数据管理，其中mongodb进行数据查询，redis管理 oauth2 中的token；

## 安装
这个项目使用 node 和 npm。请确保你本地安装了它们
- 使用 npm
```bash
$ npm i
```
- 或者 yarn，当然中国内陆推荐使用 tyarn

```bash
$ npm install yarn -g

```
```bash
$ yarn
```

## 如何运行

### 运行
```bash
$ yarn run start
```
### 打包运行

```bash
$ yarn run prod # 需要安装pm2
```

- 浏览器中访问

```
http://localhost:7001
```

## 项目结构

    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- app.js
    |-- package.json
    |-- readme-zh.md
    |-- readme.md
    |-- bin
    |   |-- www
    |-- public
    |-- src
    |   |-- config
    |   |   |-- index.js
    |   |-- mongoose
    |   |   |-- index.js
    |   |   |-- models
    |   |       |-- clientModel.js
    |   |       |-- userModel.js
    |   |-- oauth
    |   |   |-- compatibleTokenError.js
    |   |   |-- errorCode.js
    |   |   |-- index.js
    |   |   |-- model.js
    |   |-- redis
    |   |   |-- index.js
    |   |-- routes
    |   |   |-- index.js
    |   |   |-- router.spec.js
    |   |-- utils
    |       |-- errorHandle.js
    |       |-- httpException.js
    |       |-- log4j.js
    |       |-- res.js
    |       |-- tool.js
    |       |-- tool.spec.js
    |-- test
        |-- restClient.http

### 结构说明
- config：配置文件，具体配置请参照[ioredis](https://github.com/luin/ioredis)、[log4js](https://log4js-node.github.io/log4js-node/)、[mongoosejs](https://mongoosejs.com/docs/guide.html)
- mongoose: 处理mongoose所有操作
- oauth： 处理oauth2验证，目前支持模式有：password 和 refresh_token
- redis: 处理redis请求
- routes： 处理路由
- util： 所有工具类
- test/restClient.http： 简单请求示例

## 维护者
[@yy921010](https://github.com/yy921010)

## 如何贡献
非常欢迎你的加入！提一个 [Issue](https://github.com/yy921010/oauth2-koa2/issues/new) 或者提交一个 Pull Request。
标准 Readme 遵循 [Contributor Covenant](https://www.contributor-covenant.org/version/1/3/0/code-of-conduct/) 行为规范。

## 使用许可
[MIT](https://github.com/yy921010/oauth2-koa2/blob/master/LICENSE) @yy921010
