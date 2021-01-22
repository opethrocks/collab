const express = require('express');
const bcrypt = require('bcrypt');

//Bring in input validator middleware
const credentialValidation = require('../../middlewares/credentialValidation');

const router = express.Router();

//User model
const User = require('../../models/User');

//Input validation
const schema = require('../../models/Register');

router.post('/', credentialValidation(schema), async (req, res) => {
  const { email, username, password } = req.body;

  //Search database for user
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(403).json({ msg: 'User already registered' });
      return;
    } else {
      const newUser = new User({
        username,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          //Set password to hash
          newUser.password = hash;
          //Save new user
          newUser
            .save()
            .then(() => res.status(200).json({ msg: 'You can now login' }))
            .catch((err) => res.status(400).json({ msg: err }));
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
