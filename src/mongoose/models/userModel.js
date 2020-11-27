const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  id: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

// Defines a pre hook for the document.
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
