const mongoose = require('mongoose');
const config = require('../../oauth/config');
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoose.url);
const mongooseDB = mongoose.connection;
mongooseDB.on('error', console.error.bind(console, 'connection error:'));
mongooseDB.once('open', () => {
  console.log("we're connected!");
});

module.exports = mongooseDB;
