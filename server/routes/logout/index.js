const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ msg: 'See you next time' });
});

module.exports = router;
