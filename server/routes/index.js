const router = require('express').Router();

//Configure application routes

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/dashboard', require('./dashboard'));
router.use('/logout', require('./logout'));
router.use('/messages', require('./messages'));

module.exports = router;
