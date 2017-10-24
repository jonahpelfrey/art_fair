'use strict';

/** 
* =============================================================================
* Imports
* =============================================================================
*/
var Buyer = require('../../models/buyer.js');
var Q = require('q');

/** 
* =============================================================================
* Public Functions
* =============================================================================
*/
exports.getTest = function(req, res){

	if(req.session.views){
		req.session.views++;
		res.send("Buyer Test Worked! Views: " + req.session.views);
	}
	else {
		req.session.views = 1;
		res.send("Buyer Test Worked!");
	}
	
}

exports.getBuyerForOrder = function(id){

	var p = Q.defer();

	Buyer.findOne({ _id: id })
	.then(function(buyer){
		p.resolve(buyer);
		console.log(buyer);
	}, function(error){
		p.reject(error);
		console.log(error);
	});

	return p.promise;
}

exports.getBuyer = function(req, res){
	Buyer.findOne({ _id: req.id })
	.then(function(buyer){
		res.send(buyer);
	}, function(error){
		res.send(error);
	});
}

exports.getAllBuyers = function(req, res){
	Buyer.find()
	.then(function(buyers){
		res.send(buyers);
	}, function(error){
		res.send(error);
	});
}

exports.createBuyer = function(req, res){

	var b = new Buyer();
	b.firstName = req.firstName;
	b.lastName = req.lastName;
	b.address = req.address;
	b.email = req.email;

	b.save(function(err, buyer){
		if(err){
			res.send(err);
			console.log(err);
		}
		else {
			res.send("Successfully Created Buyer");
			console.log(buyer);
		}
	});

}