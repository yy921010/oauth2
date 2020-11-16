const log4js = require('log4js');
log4js.configure({
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
      category: 'http',
      keepFileExt: true
    }
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG'
    }
  }
});

module.exports = log4js;
