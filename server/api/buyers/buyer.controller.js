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
		req.session.save();
		res.end("Buyer Test Worked! Views: " + req.session.views);
	}
	else {
		req.session.views = 1;
		req.session.save();
		res.end("Buyer Test Worked!");
	}
	
}

exports.getBuyerById = function(req, res){
	Buyer.findOne({ _id: req.params.id })
		.then(function(buyer){
			res.json(buyer);
		}, function(error){
			res.send(error);
		});
}

exports.getAllBuyers = function(req, res){
	Buyer.find({})
	.then(function(buyers){
		res.send(buyers);
	}, function(error){
		res.send(error);
	});
}

exports.updateBuyer = function(req, res){
	Buyer.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, function(err, result){
		if(err) res.send(err);
		else {
			res.json({message: "Buyer updated!", result});
		}
	});
}

exports.createBuyer = function(req, res){

	var b = new Buyer();
	b.firstName = req.body.firstName;
	b.lastName = req.body.lastName;
	b.address = req.body.address;
	b.phoneNumber = req.body.phoneNumber;
	b.email = req.body.email;
	b.member = req.body.member;

	b.save(function(err, result){
		if(err) res.status(400).send(err);
		else {
			res.json({message: "Buyer successfully added!", result});
		}
	});

}

exports.removeBuyerById = function(req, res){
	Buyer.findOneAndRemove({ _id: req.params.id}, function(err, result){
		if(err) res.send(err);
		res.json({message: "Buyer successfully deleted!", result});
	});
}