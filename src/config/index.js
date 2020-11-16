module.exports = {
  accessTokenLifetime: 300,
  mongoose: {
    uri: 'mongodb://127.0.0.1:27017/test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  redis: {
  },
  log4j: {}
};
