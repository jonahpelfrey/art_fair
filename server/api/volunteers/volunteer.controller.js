'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Volunteers = require('../../models/volunteer.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getVolunteer = function(id) {

	var p = Q.defer();

	Volunteers.findOne({_id: id})
	.then(function(response){
		p.resolve(response);
		console.log(response);
	}, function(err){
		p.reject(err);
		console.log(err);
	});

	return p.promise;
}