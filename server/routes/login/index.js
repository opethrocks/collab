const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

//Bring in input validator middleware
const inputValidator = require('../../middlewares/credentialValidation');
//Input validation schema
const schema = require('../../models/Login');

//Mongoose User Schema
const User = require('../../models/User');

//Mongoose Token Schema
const Token = require('../../models/Token');
const token = new Token();

router.post('/', inputValidator(schema), async (req, res) => {
  const { email, password } = req.body;

  //Search database for registered user
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ errors: [{ msg: 'User not found', param: 'email' }] });
    }

    //Check password, If correct generate a login token
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        errors: [{ msg: 'Password is incorrect', param: 'password' }],
      });
    } else {
      const authToken = token.generateToken(user);

      res.cookie('token', authToken, {
        secure: process.env == 'Production' ? true : false,
        httpOnly: true,
        sameSite: 'strict',
      });

      res.status(200).send({ username: user.username });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
