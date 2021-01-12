// Middleware for validating user tokens
const jwt = require('jsonwebtoken');

//JWT signing keys
const { jwtAccessKey, jwtRefreshKey } = require('../config/keys');

//Mongoose user model
const User = require('../models/User');

//Mongoose Token Schema
const Token = require('../models/Token');
const token = new Token();

//If access token is valid, send it back in response.
//If invalid and refresh token is valid, generate new access token and send to client

const tokenValidator = () => {
  return async (req, res, next) => {
    const accessToken = req.body.token;
    const refreshToken = req.cookies.token;

    //Check access token for validity, if so send back in response.
    //If expired, and refresh token is valid, generate new access token and send to client.
    try {
      const decodedAccessToken = await jwt.verify(accessToken, jwtAccessKey);
      const user = await User.findOne({ _id: decodedAccessToken.sub });

      res.status(200).send({ token: accessToken, name: user.name });
    } catch (err) {
      if (err.message === 'jwt expired') {
        try {
          const decodedRefreshToken = await jwt.verify(
            refreshToken,
            jwtRefreshKey
          );
          const user = await User.findOne({ _id: decodedRefreshToken.sub });
          const newAccessToken = token.generateAccessToken(user);

          return res
            .status(200)
            .send({ token: newAccessToken, name: user.name });
        } catch (err) {
          res.status(403).send(err.message);
        }
      } else {
        res.status(401).send('unauthenticated');
      }
    }
    next();
  };
};

module.exports = tokenValidator;
