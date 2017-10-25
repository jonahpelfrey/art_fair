var express = require('express');
var router = express.Router();
var controller = require('./controller.js');

router.get('/main', controller.showDashboard);

module.exports = router;