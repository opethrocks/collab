const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  blocked_at: {
    type: Date,
    require: false
  }
});

mongoose.model('user', UserSchema);
module.exports = mongoose.model('User', UserSchema);
