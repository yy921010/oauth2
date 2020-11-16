const config = require('../config');

const combineResponse = tokenData => {
  return {
    access_token: tokenData.accessToken,
    refreshToken: tokenData.refreshToken,
    expires_in: config.accessTokenLifetime,
    token_type: 'Bearer'
  };
};

module.exports = combineResponse;
