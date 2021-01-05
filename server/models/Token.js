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

//Generate access token

TokenSchema.methods.generateAccessToken = function (user) {
  const { accessKey, accessCsrf } = require('../config/signingKeys');
  const payload = {
    sub: user._id,
    name: user.name,
    scope: 'user',
    expiresIn: '1m',
    csrf: accessCsrf
  };

  const accessToken = jwt.sign(payload, accessKey);

  return accessToken;
};

//Generate Refresh Token

TokenSchema.methods.generateRefreshToken = function (user) {
  const { refreshKey, refreshCsrf } = require('../config/signingKeys');
  const payload = {
    sub: user._id,
    csrf: refreshCsrf,
    expiresIn: '1h'
  };

  const refreshToken = jwt.sign(payload, refreshKey);

  return refreshToken;
};

mongoose.model('token', TokenSchema);
module.exports = mongoose.model('Token', TokenSchema);
