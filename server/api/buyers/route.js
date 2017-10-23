'use strict';

/** 
* =============================================================================
* Imports
* =============================================================================
*/
var express = require('express');
var controller = require('./buyer.controller.js');
var router = express.Router();

/** 
* =============================================================================
* Routes
* =============================================================================
*/
router.get('/buyers/:id', controller.getBuyer);
router.get('/buyers/all', controller.getAllBuyers);
router.post('/buyers/create', controller.createBuyer);

module.exports = router;