const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

//User model
const User = require('../../models/User');

router.post('/register', (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  let errors = [];

  //Check for all required fields
  if (!email || !name || !password || !confirmPassword) {
    errors.push({
      msg: 'All fields are required',
      param: 'email'
    });
    errors.push({
      msg: 'All fields are required',
      param: 'password'
    });
    errors.push({
      msg: 'All fields are required',
      param: 'name'
    });
    errors.push({
      msg: 'All fields are required',
      param: 'confirmPassword'
    });
  }

  //Check passwords match
  if (password !== confirmPassword) {
    errors.push({ msg: 'Passwords do not match', param: 'password' });
  }

  //Check password length
  if (password && password.length < 8) {
    errors.push({
      msg: 'Password must be at least 8 characters',
      param: 'password'
    });
  }

  //Send errors to client
  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
  } else {
    //Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res
          .status(400)
          .json({ errors: [{ msg: 'User already exists', param: 'email' }] });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          //Set password to hash
          newUser.password = hash;
          //Save new user
          newUser
            .save()
            .then((user) => res.status(200).json({ msg: 'You can now login' }))
            .catch((err) => res.status(400).json({ msg: err }));
        });
      }
    });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { id } = req.session;
  const signString = uuidv4();

  const payload = {
    email,
    id,
    signString
  };

  let errors = [];

  if (!email || !password) {
    errors.push({ msg: 'All fields are required', param: 'password' });
    errors.push({ msg: 'All fields are required', param: 'email' });

    res.status(400).json({ errors: errors });
    return;
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      errors.push({ msg: 'User not found', param: 'email' });
      res.status(400).json({ errors: errors });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) res.status(400).json(err);
        if (result) {
          const token = jwt.sign(payload, signString);
          res.status(200).json({ token });
        } else {
          errors.push({ msg: 'Incorrect Password', param: 'password' });
          res.status(400).json({ errors: errors });
        }
      });
    }
  });
});

module.exports = router;
