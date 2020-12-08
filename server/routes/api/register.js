const express = require('express');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator/check');

const router = express.Router();

//User model
const User = require('../../models/User');

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8
    }),
    check(['name'], 'Name is a required field').exists({
      checkFalsy: true,
      checkNull: true
    }),
    check(['email'], 'Email is a required field').exists({
      checkFalsy: true,
      checkNull: true
    }),
    check('password', 'Password is required').custom(
      (val, { req, location, path }) => {
        // if (val.length < 8 || req.body.confirmPassword.length < 8) {
        //   throw new Error('Password must be at least 8 characters');
        // }
        if (val !== req.body.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        return val;
      }
    )
  ],
  (req, res) => {
    const errors = validationResult(req);

    const { name, email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    } else {
      //Validation passed
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          //User exists

          res.status(201).send({ msg: 'User already registered' });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          //Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.log(err);
              //Set password to hash
              newUser.password = hash;
              //Save new user
              newUser.save().then((user) => {
                res
                  .status(200)
                  .send({ msg: 'You are now registered and can login' });
              });
            });
          });
        }
      });
    }
  }
);

module.exports = router;
