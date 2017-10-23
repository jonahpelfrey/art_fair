'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Artist = require('../../models/artist.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getArtistForOrder = function(id){

	var p = Q.defer();

	Artist.findOne({_id: id})
	.then(function(response){
		p.resolve(response);
		console.log(response);
	}, function(err){
		p.reject(err);
		console.log(err);
	});

	return p.promise;
}

exports.getArtist = function(req, res){
	Artist.findOne({ _id: req.id})
	.then(function(artist){
		res.send(artist)
	}, function(error){
		res.send(err);
	});
}

exports.getAllArtists = function(req, res){
	Artist.find()
	.then(function(artists){
		res.send(artists);
	}, function(error){
		res.send(error);
	});
}

exports.createArtist = function(req, res){

	var a = new Artist();
	a.firstName = req.firstName;
	a.lastName = req.lastName;

	a.save(function(err, artist){
		if(err){
			res.send(err);
			console.log(err);
		}
		else {
			res.send("Successfully Created Artist");
			console.log(artist);
		}
	});

}