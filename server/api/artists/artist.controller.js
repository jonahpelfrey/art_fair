'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
// var Artist = require('../../models/artist.js');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getArtist = function(req, res) {

	Artist.find({'name': req.params.name})
	.then(function(artist){
		res.send(artist);
	}, function(err){
		res.send(err);
	});
}