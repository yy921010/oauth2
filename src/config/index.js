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
  grpcServe: 'localhost:33207',
  redis: {
    port: 6379,
    host: '127.0.0.1',
    family: 4
  },
  log4j: {
    appenders: {
      console: {
        type: 'console'
      },
      access: {
        type: 'dateFile',
        filename: '/Users/charles/Desktop/hadron-logs/access/access.log',
        alwaysIncludePattern: true,
        pattern: 'yyyyMMdd',
        daysToKeep: 60,
        numBackups: 3,
        keepFileExt: true
      }
    },
    categories: {
      default: {
        appenders: ['access', 'console'],
        level: 'INFO'
      }
    }
  }
};
