const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const TokenSchema = new mongoose.Schema({
  expires_at: {
    type: Date,
    require: true
  },
  last_used_at: {
    type: Date,
    require: true
  },
  user_id: {
    type: String,
    require: true
  },
  refresh_token: {
    type: Buffer,
    require: false
  }
});

//Generate Auth Token

TokenSchema.methods.generateToken = function (user) {
  const key =
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_KEY
      : require('../config/keys').jwtKey;

  const payload = {
    sub: user._id
  };
  const token = jwt.sign(payload, key, {
    expiresIn: 60 * 60 * 24
  });

  return token;
};

mongoose.model('token', TokenSchema);
module.exports = mongoose.model('token', TokenSchema);
