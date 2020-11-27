const codePrefix = 'LEMO.';

const compatibleTokenError = errorMsg => {
  const responseBody = {};
  switch (errorMsg) {
    case 'Invalid token: access token has expired':
      responseBody.error_code = codePrefix + '101008';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 401;
      break;
    case 'Invalid client: cannot retrieve client credentials':
      responseBody.error_code = codePrefix + '101009';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 400;
      break;
    case 'Unsupported grant type: `grant_type` is invalid':
      responseBody.error_code = codePrefix + '101010';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 400;
      break;
    case 'Invalid token: access token is invalid':
      responseBody.error_code = codePrefix + '101011';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 401;
      break;
    case 'Invalid grant: refresh token has expired':
      responseBody.error_code = codePrefix + '101013';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 400;
      break;
    case 'Invalid request: malformed authorization header':
      responseBody.error_code = codePrefix + '101014';
      responseBody.error_message = errorMsg;
      responseBody.http_code = 400;
      break;
    default:
      break;
  }
  return responseBody;
};

module.exports = compatibleTokenError;
