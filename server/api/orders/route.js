'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var express = require('express');
var controller = require('./order.controller');
var router = express.Router();


/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
router.get('/orders/:id', controller.getOrder);
router.get('/orders/all', controller.getOrders);
router.post('orders/create', controller.createOrder);

module.exports = router;