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

exports.updateArtist = function(req, res){
	Artist.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, function(err, artist){
		if(err) res.send(err);
		res.json({message: "Artist updated!", artist});;
	});
}

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

exports.getArtistById = function(req, res){
	Artist.findOne({ _id: req.params.id})
		.then(function(artist){
			res.json(artist);
		}, function(error){
			res.send(err);
		});
}

exports.getAllArtists = function(req, res){
    Artist.find({})
	    .then(function(artists){
	    	res.send(artists);
	    }, function(error){
	    	res.send(error);
	    });
}

exports.createArtist = function(req, res){

	var a = new Artist();
	a.firstName = req.body.firstName;
	a.lastName = req.body.lastName;

	a.save(function(err, artist){
		if(err){
			res.send(err);
		}
		else {
			res.json({message: "Artist successfully added!", artist });
		}
	});
}