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
      // //Generate token
      // const newToken = new Token({
      //   expires_at: Date.now() + 60,
      //   last_used_at: Date.now(),
      //   user_id: user._id
      // }).save();

      const accessToken = await token.generateAccessToken(user);
      const refreshToken = await token.generateRefreshToken(user);

      // newToken.refresh_token = refreshToken;

      res.cookie('accessToken', accessToken, {
        secure: process.env == 'Production' ? true : false
      });
      res.cookie('refreshToken', refreshToken, {
        secure: process.env == 'Production' ? true : false
      });
      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
