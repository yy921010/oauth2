const mongoose = require('mongoose');
const config = require('../config');
const log = require('../utils/log4j').getLogger('mongooseClient');
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoose.uri, config.mongoose.options);
const mongooseDB = mongoose.connection;
mongooseDB.on('error', log.error.bind(console, 'connection error:'));
mongooseDB.once('open', () => {
  log.info('mongoose has successfully connected!');
});

module.exports = mongooseDB;
