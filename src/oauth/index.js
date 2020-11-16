const OAuth2 = require('oauth2-server');
const oauthServe = new OAuth2({
  model: require('./model')
});
module.exports = oauthServe;
