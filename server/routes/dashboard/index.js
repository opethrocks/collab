const express = require('express');

const router = express.Router();

const tokenValidator = require('../../middlewares/tokenValidator');
const tokenGenerator = require('../../middlewares/tokenValidator');

router.post('/', tokenValidator(), (req, res, next) => {});

module.exports = router;
