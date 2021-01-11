const router = require('express').Router();

//Configure application routes

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
