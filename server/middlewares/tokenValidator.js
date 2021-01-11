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
  return (req, res, next) => {
    const accessToken = req.body.token;
    const refreshToken = req.cookies.token;

    console.log(accessToken);

    jwt.verify(accessToken, jwtAccessKey, (err) => {
      if (err) {
        if (err.message === 'jwt expired') {
          jwt.verify(refreshToken, jwtRefreshKey, (err, data) => {
            if (!err) {
              const user = User.findOne({ _id: data.sub });
              const newAccessToken = token.generateAccessToken(user);

              return res
                .status(200)
                .send({ token: newAccessToken, name: user.name });
            } else {
              console.log(err.message);
            }
          });
        } else {
          res.status(401).send('unauthenticated');
        }
      } else {
        res.status(200).send({ token: accessToken });
      }
    });
    next();
  };
};

module.exports = tokenValidator;
