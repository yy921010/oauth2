const log4js = require('log4js');
const config = require('../config');
log4js.configure(config.log4j);

module.exports = log4js;
