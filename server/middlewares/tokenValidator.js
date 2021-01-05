// Middleware for validating user tokens

const jwt = require('jsonwebtoken');

const tokenValidator = () => {
  return async (req, res, next) => {
    const { accessKey, accessCsrf } = require('../config/signingKeys');
    const { token } = req.cookies;

    try {
      const decodedToken = await jwt.verify(token, accessKey);
      const { sub, status, name, accessCsrf } = decodedToken;

      if (decodedToken && csrfToken === csrfKey) {
        res.cookie(token, 'token', { httpOnly: true });
        res.status(200).json({ sub, status, name });
      }
    } catch (err) {
      res.status(401).json({ userStatus: 'unauthenticated' });
    }
    next();
  };
};

module.exports = tokenValidator;
