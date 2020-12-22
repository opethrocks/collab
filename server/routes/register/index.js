const express = require('express');
const bcrypt = require('bcrypt');
//Bring in input validator middleware
const inputValidator = require('../../middlewares/credentialValidation');

const router = express.Router();

//User model
const User = require('../../models/User');

//Input validation
const schema = require('../../models/Register');

router.post('/', inputValidator(schema), (req, res) => {
  const { email, name, password } = req.body;

  //Search database for user

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(403).json({ status: [{ msg: 'User already registered' }] });
        return;
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
            .then(() =>
              res.status(200).json({ status: [{ msg: 'You can now login' }] })
            )
            .catch((err) => res.status(400).json({ msg: err }));
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
