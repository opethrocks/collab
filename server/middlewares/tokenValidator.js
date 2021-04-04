// Middleware for validating user tokens
const jwt = require('jsonwebtoken');

//JWT signing keys
const key =
  process.env.NODE_ENV === 'production'
    ? process.env.JWT_KEY
    : require('../config/keys').jwtKey;

//Mongoose user model
const User = require('../mongoose/models/User');

//If access token is valid, send it back in response.

const tokenValidator = () => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    try {
      const decodedToken = await jwt.verify(token, key);
      const user = await User.findOne({ _id: decodedToken.sub });

      return res.status(200).send({ username: user.username });
    } catch (err) {
      //If token is invalid remove token from response and send error response
      res.clearCookie('token');
      res.status(401).send({ msg: 'You are unauthenticated' });
    }

    next();
  };
};

module.exports = tokenValidator;
