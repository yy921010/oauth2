const mongoose = require('mongoose');
const config = require('../../config');
const log = require('../../utils/log4j').getLogger('mongoose/serve');
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoose.uri, config.mongoose.options);
const mongooseDB = mongoose.connection;
mongooseDB.on('error', console.error.bind(console, 'connection error:'));
mongooseDB.once('open', () => {
  log.info("we're connected!");
});

module.exports = mongooseDB;
