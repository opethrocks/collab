const express = require('express');
const bcrypt = require('bcrypt');
//Bring in input validator middleware
const inputValidator = require('../../middlewares/credentialValidation');

//Bring in token authentication
// const auth = require('../../auth/index');

const router = express.Router();

//Mongoose User Schema
const User = require('../../models/User');

//Mongoose Token Schema
const Token = require('../../models/Token');
const token = new Token();

//Input validation
const schema = require('../../models/Login');

router.post('/', inputValidator(schema), async (req, res) => {
  const { email, password } = req.body;

  //Search database for registered user
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(400)
        .json({ errors: [{ msg: 'User not found', param: 'email' }] });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        errors: [{ msg: 'Password is incorrect', param: 'password' }]
      });
    } else {
      // const accessToken = token.generateAccessToken(user);
      const refreshToken = token.generateRefreshToken(user);

      res.cookie('token', refreshToken, {
        secure: process.env == 'Production' ? true : false,
        httpOnly: true,
        sameSite: 'strict'
      });

      res.status(200).send({ name: user.name });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
