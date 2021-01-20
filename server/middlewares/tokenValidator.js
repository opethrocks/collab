// Middleware for validating user tokens
const jwt = require('jsonwebtoken');

//JWT signing keys
const { jwtRefreshKey } = require('../config/keys');

//Mongoose user model
const User = require('../models/User');

//If access token is valid, send it back in response.
//If invalid and refresh token is valid, generate new access token and send to client

const tokenValidator = () => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    try {
      const decodedToken = await jwt.verify(token, jwtRefreshKey);
      const user = await User.findOne({ _id: decodedToken.sub });

      return res.status(200).send({ name: user.name });
    } catch (err) {
      res.status(401).send({ msg: 'You are unauthenticated' });
    }

    next();
  };
};

module.exports = tokenValidator;
