const express = require('express');
const bcrypt = require('bcrypt');
const inputValidator = require('../../middlewares/credentialValidation');
const User = require('../../mongoose/models/User');
const Token = require('../../auth/Token');
const schema = require('../../inputValidation/Login');

const router = express.Router();

router.post('/', inputValidator(schema), async (req, res) => {
  const { email, password } = req.body;

  //Search database for registered user
  try {
    const user = await User.findOne({ email });
    if (!user) throw { msg: 'User not found', param: 'email' };

    //Check password, If correct generate a login token
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      throw { msg: 'Password is incorrect', param: 'password' };

    const token = new Token();
    const authToken = token.generateToken(user);

    res.cookie('token', authToken, {
      secure: process.env == 'Production' ? true : false,
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).send({ username: user.username });
  } catch (err) {
    res.status(400).json({ errors: [err] });
  }
});

module.exports = router;
