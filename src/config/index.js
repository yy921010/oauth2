module.exports = {
  port: 7001,
  accessTokenLifetime: 300,
  mongoose: {
    uri: 'mongodb://127.0.0.1:27017/tmk',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  redis: {
    port: 6379,
    host: '127.0.0.1'
  },
  log4j: {}
};
