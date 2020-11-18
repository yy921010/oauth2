
const combineResponse = tokenData => {
  return {
    access_token: tokenData.accessToken,
    refresh_token: tokenData.refreshToken,
    expires_in: tokenData.client.accessTokenLifetime,
    token_type: 'Bearer'
  };
};

module.exports = combineResponse;
