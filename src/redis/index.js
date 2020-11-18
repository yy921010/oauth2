// const redis = require('redis');
const config = require('../config');
const Redis = require('ioredis');
const redis = new Redis(config.redis);

const log = require('../utils/log4j').getLogger('redisClient');
redis.on('error', error => {
  log.error(error);
});
redis.on('connect', () => {
  log.info('redis has successfully connected');
});

module.exports = redis;
