
module.exports = {
  USERNAME_OR_PASSWORD_IS_ERROR: {
    code: '101001',
    msg: 'Invalid user: username or password is incorrect, please re-enter'
  },
  USER_HAD_LOCKED: {
    code: '101002',
    msg: 'Invalid user: user has been locked'
  },
  SCOPE_INVALID: {
    code: '101003',
    msg: 'Invalid scope: scope can not be empty'
  },
  SCOPE_IS_WRONG: {
    code: '101004',
    msg: 'Invalid user: invalid scope'
  },
  CLIENT_IS_ILLEGAL: {
    code: '101005',
    msg: 'Invalid client: illegal device'
  },
  CLIENT_HAD_LOCKED: {
    code: '101006',
    msg: 'Invalid user: client has been locked'
  },
  TOKEN_INVALID: {
    code: '101007',
    msg: 'Invalid token: access token is invalid'
  },
  REFRESH_TOKEN_INVALID: {
    code: '101012',
    msg: 'Invalid grant: refresh token is invalid'
  }
};
