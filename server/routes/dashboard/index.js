const express = require('express');
const { valid } = require('joi');
const jwt = require('jsonwebtoken');

const router = express.Router();

const tokenValidator = require('../../middlewares/tokenValidator');

router.get('/', tokenValidator(), (req, res, next) => {
  // //Extract token from request
  // const token = req.cookies.token;
  // if (!token) {
  //   //If no token is found then alert user is not authorized
  //   return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
  // }
  // //Verify signature on token
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   res.clearCookie('token');
  //   return res.status(400).send(err.message);
  // }
});

module.exports = router;
