const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const index = require('./src/routes');
const log = require('./src/utils/log4j').getLogger('app');
const errorHandle = require('./src/utils/errorHandle');
const grpcService = require('./src/grpc');
require('./src/mongoose');

grpcService();
app.use(errorHandle);
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger((str, arg) => {
  log.info(str);
}));

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});

module.exports = app;
