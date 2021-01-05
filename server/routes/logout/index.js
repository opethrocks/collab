const express = require('express');

const router = express.Router();

const tokenInvalidator = require('../../middlewares/tokenInvalidator');
// const tokenValidator = require('../../middlewares/tokenValidator');

router.get('/', tokenInvalidator(), (req, res) => {});

module.exports = router;
