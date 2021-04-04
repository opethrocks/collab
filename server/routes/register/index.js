const express = require('express');
const bcrypt = require('bcrypt');
const inputValidator = require('../../middlewares/credentialValidation');
const User = require('../../mongoose/models/User');
const schema = require('../../inputValidation/Register');

const router = express.Router();

router.post('/', inputValidator(schema), async (req, res) => {
  const { email, username, password } = req.body;

  //Search database for user
  try {
    const user = await User.findOne({ email: email });
    if (user) throw { msg: 'User already registered', code: 403 };

    const newUser = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw { msg: 'Error salting password', code: 400 };

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw { msg: 'Error generating hash', code: 400 };

    //Set user password to hash
    newUser.password = hash;

    const saveUser = await newUser.save();
    if (!saveUser) throw { msg: 'Error saving user to database', code: 400 };

    res.status(200).json({ msg: 'You can now login' });
  } catch (err) {
    res.status(err.code).json(err);
  }
});

module.exports = router;
