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
router.get('/', controller.getAllBuyers);
router.get('/:id', controller.getBuyerById);
router.put('/:id', controller.updateBuyer);
router.post('/', controller.createBuyer);
router.delete('/:id', controller.removeBuyerById);

module.exports = router;