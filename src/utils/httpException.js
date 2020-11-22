const { OAuthError } = require('oauth2-server');

class HttpException extends OAuthError {
  constructor(error = {}) {
    super();
    this.httpCode = 400;
    this.code = 'LEMO.' + error.code;
    this.message = error.msg;
  }
}

module.exports = HttpException;
