//Secret Key
const { secretKey } = require('../config/signingKeys');

//Mongoose Token Schema
const Token = require('../models/Token');

//Generate token
const jwt = new Token();

const tokenInvalidator = () => {
  return async (req, res, next) => {
    const token = await jwt.generateAuthToken();
    try {
      if (token) {
        res.status(401).cookies(token, 'token');
      }
    } catch (err) {
      res.status(401).send('unauthorized');
    }
    next();
  };
};

module.exports = tokenInvalidator;
