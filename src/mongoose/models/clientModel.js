const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  id: String,
  clientId: String,
  clientSecret: String,
  isLocked: Number,
  accessTokenValidateSeconds: Number,
  refreshTokenValidateSeconds: Number,
  createAt: {
    type: Date,
    dafault: Date.now()
  },
  updateAt: {
    type: Date,
    dafault: Date.now()
  }
});

ClientSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Client', ClientSchema);
