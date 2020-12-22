const express = require('express');
const bcrypt = require('bcrypt');
//Bring in input validator middleware
const inputValidator = require('../../middlewares/credentialValidation');

//Bring in token authentication
const auth = require('../../auth/index');

const router = express.Router();

//Mongoose User Schema
const User = require('../../models/User');

//Input validation
const schema = require('../../models/Login');

//Errors array
const errors = [];

router.post('/', inputValidator(schema), (req, res) => {
  const { email, password } = req.body;

  //Search database for registered user

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      //If user not found then send error
      errors.push({ msg: 'User not found', param: 'email' });
      res.status(400).json({ errors: errors });
    } else {
      //If user is found check password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.status(400).json(err);
        //Generate json web token and add it to response.cookie if password matches
        if (result) {
          const token = auth.generateAuthToken();
          res.cookie('token', token, { httpOnly: true }).send();
        } else {
          errors.push({ msg: 'Incorrect Password', param: 'password' });
          res.status(400).json({ errors: errors });
        }
      });
    }
  });
});

module.exports = router;
