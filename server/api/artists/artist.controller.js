'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Artists = require('../../models/artist.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getArtist = function(id) {

	var p = Q.defer();

	Artists.findOne({_id: id})
	.then(function(response){
		p.resolve(response);
		console.log(response);
	}, function(err){
		p.reject(err);
		console.log(err);
	});

	return p.promise;
}