const redis = require('redis');
const config = require('../config');
const client = redis.createClient(config.redis);

client.on('error', error => {
  console.error(error);
});

module.exports = client;
