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
  const key =
    process.env.NODE_ENV === 'production'
      ? process.env.JWT_KEY
      : require('../config/keys').jwtAccessKey;

  const payload = {
    sub: user._id,
    name: user.name
  };
  const accessToken = jwt.sign(payload, key, { expiresIn: 60 });

  return accessToken;
};

//Generate Refresh Token

TokenSchema.methods.generateRefreshToken = function (user) {
  const { jwtRefreshKey } = require('../config/keys');
  const payload = {
    sub: user._id
  };
  const refreshToken = jwt.sign(payload, jwtRefreshKey, {
    expiresIn: 60 * 60 * 24
  });

  return refreshToken;
};

mongoose.model('token', TokenSchema);
module.exports = mongoose.model('Token', TokenSchema);
