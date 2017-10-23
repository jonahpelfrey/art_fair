'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
// var Orders = require('../../models/order.js');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getOrder = function(req, res) {

	Orders.find({'id': req.params.id})
	.then(function(order){
		res.send(order);
	}, function(err){
		res.send(err);
	});
}