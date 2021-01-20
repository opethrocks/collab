const express = require('express');

const router = express.Router();

const tokenValidator = require('../../middlewares/tokenValidator');

router.post('/', tokenValidator(), (req, res, next) => {
  next();
});

module.exports = router;
