const { OAuthError } = require('oauth2-server');

const log = require('./log4j').getLogger('errorHandle');
const compatibleTokenError = require('../oauth/compatibleTokenError');
const { isEmpty } = require('../utils/tool');

const errorDeal = (ctx, err) => {
  log.error('[errorHandle] error', err, 'errorRequestUrl', ctx.request.url);
  let status = 400;
  if (err instanceof OAuthError) {
    if (isEmpty(compatibleTokenError(err.message))) {
      ctx = {
        error_code: err.code,
        error_message: err.message
      };
    } else {
      const requestBody = compatibleTokenError(err.message);
      ctx = {
        error_code: requestBody.error_code,
        error_message: requestBody.error_message
      };
      status = requestBody.http_code;
    }
  } else {
    ctx = {
      error_code: 'LEMO.101000',
      error_message: 'service is not available'
    };
  }
  ctx.status = status;
  return ctx;
};

const errorHandle = async(ctx, next) => {
  let status = null;
  try {
    await next();
    status = ctx.status;
  } catch (err) {
    log.error('[errorHandle] error', err, 'errorRequestUrl', ctx.request.url);
    if (err instanceof OAuthError) {
      status = err.httpCode || 500;
      if (isEmpty(compatibleTokenError(err.message))) {
        ctx.body = {
          error_code: err.code,
          error_message: err.message
        };
      } else {
        const requestBody = compatibleTokenError(err.message);
        ctx.body = {
          error_code: requestBody.error_code,
          error_message: requestBody.error_message
        };
        status = requestBody.http_code;
      }
    } else {
      ctx.body = {
        error_code: 'LEMO.101000',
        error_message: 'service is not available'
      };
    }
  }
  ctx.response.status = status;
};

module.exports = {
  errorHandle,
  errorDeal
};
