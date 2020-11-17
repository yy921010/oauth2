const redis = require('redis');
const config = require('../config');
const client = redis.createClient(config.redis.port, config.redis.host);
const log = require('../utils/log4j').getLogger('redisClient');
client.on('error', error => {
  log.error(error);
});
client.on('connect', () => {
  log.info('redis has successfully connected');
});

module.exports = client;
