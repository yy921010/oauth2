const router = require('koa-router')();
const oauthServe = require('../oauth/index');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;
const combineResponse = require('../utils/res');
const log = require('../utils/log4j').getLogger('router');

router.get('/', async(ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    baseUrl: '/oauth',
    postUrl: 'https://oauth.lemonnard.com'
  };
});

router.post('/oauth/token', async ctx => {
  const { request, response } = ctx;
  const oauthReq = new Request(request);
  const oauthRes = new Response(response);
  const tokenObject = await oauthServe.token(oauthReq, oauthRes);
  ctx.body = combineResponse(tokenObject);
});

router.get('/oauth/secure_data', async(ctx, next) => {
  const { request, response } = ctx;
  const oauthReq = new Request(request);
  const oauthRes = new Response(response);
  const result = await oauthServe.authenticate(oauthReq, oauthRes);
  log.debug('[/oauth/secure_data]', result);
  ctx.body = 'secure data';
});

module.exports = router;
