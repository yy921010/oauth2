const fmt = require('util').format;
const UserModel = require('../mongoose/models/userModel');
const ClientModel = require('../mongoose/models/clientModel');
const log4js = require('../utils/log4j');
const redisClient = require('../redis');
const { isEmpty } = require('../utils/tool');
/**
 * Redis formats.
 */
const formats = {
  client: 'clients:%s',
  token: 'tokens:%s',
  user: 'users:%s'
};
const log = log4js.getLogger('model');

module.exports = {
  /**
   *  验证设备
   * @param {} clientId
   * @param {*} clientSecret
   */
  async getClient(clientId, clientSecret) {
    log.info('[getClient] msg --> enter');
    log.debug('[getClient] clientId -->', clientId);
    log.debug('[getClient] clientSecret -->', clientSecret);
    const client = await ClientModel.findOne({ clientId: '123456' });
    if (!client) {
      log.warn('[getClient] client is empty');
      return;
    }

    if (client.clientSecret !== clientSecret) {
      log.warn("[getClient] client's clientSecret is wrong");
      return;
    }

    if (+client.isLocked === 1) {
      log.warn('[getClient] client is locked');
      return;
    }

    return {
      id: client.id,
      accessTokenLifetime: client.accessTokenValidateSeconds,
      refreshTokenLifetime: client.refreshTokenValidateSeconds,
      grants: ['refresh_token', 'password']
    };
  },

  async getUser(username, password) {
    log.info('[getUser] msg --> enter');
    const user = await UserModel.findOne({
      username
    });
    if (!user) {
      log.warn('[getUser] user is empty');
      return;
    }

    if (user.password !== password) {
      log.warn("[getUser] user's password is wrong");
      return;
    }

    if (+user.isLocked === 1) {
      log.warn('[getUser] user is locked');
      return;
    }
    return {
      id: user.id,
      scope: user.scope || ['web', 'ott', 'stb']
    };
  },

  /**
   * 验证scope
   * @param {} user
   * @param {*} client
   * @param {*} scope
   */
  async validateScope(user, client, scope) {
    if (!scope) {
      throw new Error('scope is null');
    }
    log.debug('[validateScope] [user] -->', user);
    log.debug('[validateScope] [client] -->', client);
    log.debug('[validateScope] [scope] -->', scope);
    return scope
      .split(':')
      .filter(s => user.scope.indexOf(s) >= 0)
      .join(' ');
  },

  async saveToken(token, client, user) {
    const pipe = redisClient.pipeline();
    const data = {
      ...token,
      user: {
        id: user.id
      },
      client: {
        id: client.id,
        accessTokenLifetime: client.accessTokenLifetime
      }
    };
    token.clientId = client.id;
    token.userId = user.id;
    await pipe
      .hmset(fmt(formats.token, token.accessToken), token)
      .hmset(fmt(formats.token, token.refreshToken), token)
      .exec()
      .then(result => {
        log.debug('[saveToken] token %s saved successfully', token);
      });
    return data;
  },

  async getAccessToken(bearerToken) {
    const token = await redisClient.hgetall(fmt(formats.token, bearerToken));
    if (isEmpty(token)) {
      return;
    }
    log.debug('[getAccessToken] token = %s', token);
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
      scope: token.scope,
      client: {
        id: token.clientId
      },
      user: {
        id: token.userId
      }
    };
  },

  async getRefreshToken(bearerToken) {
    const token = await redisClient.hgetall(fmt(formats.token, bearerToken));
    log.debug('[getRefreshToken] token = %s', token);
    if (isEmpty(token)) {
      return;
    }

    return {
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: new Date(token.refreshTokenExpiresAt),
      scope: token.scope,
      client: {
        id: token.clientId
      },
      user: {
        id: token.userId
      }
    };
  },

  async revokeToken(token) {
    log.info('[revokeToken] enter');
    log.debug('[revokeToken] token = %s', token);
    const result = await redisClient.del((fmt(formats.token, token.refreshToken)));
    log.debug('[revokeToken] result= %s', result);
    return result;
  }
};
