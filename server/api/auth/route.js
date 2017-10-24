var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/', auth.home);

module.exports = router;