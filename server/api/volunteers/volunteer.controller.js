'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
// var Volunteers = require('../../models/order.js');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getOrder = function(req, res) {

	Volunteers.find({'name': req.params.name})
	.then(function(volunteer){
		res.send(volunteer);
	}, function(err){
		res.send(err);
	});
}