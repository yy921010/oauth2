const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  clientId: String,
  clientSecret: String,
  isLocked: Number,
  accessTokenValidateSeconds: Number,
  refreshTokenValidateSeconds: Number,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
});

// Defines a pre hook for the document.
ClientSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Client', ClientSchema);
