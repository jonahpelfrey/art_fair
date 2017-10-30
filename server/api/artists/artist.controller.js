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

exports.updateArtist = function(req, res){
	Artist.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, function(err, result){
		if(err) res.send(err);
		res.json({message: "Artist updated!", result});;
	});
}

exports.createArtist = function(req, res){

	var a = new Artist();
	a.firstName = req.body.firstName;
	a.lastName = req.body.lastName;
	a.phoneNumber = req.body.phoneNumber;
	a.email = req.body.email;
	a.signature = req.body.signature;
	a.username = req.body.username;
	a.password = req.body.password;

	a.save(function(err, result){
		if(err){
			res.status(400).send(err);
		}
		else {
			res.json({message: "Artist successfully added!", result });
		}
	});
}

exports.removeArtistById = function(req, res){
	Artist.findOneAndRemove({ _id: req.params.id}, function(err, result){
		if(err) res.send(err);
		res.json({message: "Artist successfully deleted!", result});
	});
}



