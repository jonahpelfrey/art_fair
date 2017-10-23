'use strict';

/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Volunteer = require('../../models/volunteer.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getVolunteerForOrder = function(id) {

	var p = Q.defer();

	Volunteer.findOne({_id: id})
	.then(function(volunteer){
		p.resolve(volunteer);
		console.log(volunteer);
	}, function(err){
		p.reject(err);
		console.log(err);
	});

	return p.promise;
}

exports.getVolunteer = function(req, res){
	Volunteer.findOne({ _id: req.id })
	.then(function(volunteer){
		res.send(volunteer);
	}, function(error){
		res.send(error);
	});
}

exports.getAllVolunteers = function(req, res){
	Volunteer.find()
	.then(function(volunteers){
		res.send(volunteers);
	}, function(error){
		res.send(error);
	});
}

exports.createVolunteer = function(req, res) {

	var v = new Volunteer();
	v.firstName = req.firstName;
	v.lastName = req.lastName;

	v.save(function(err, volunteer){
		if(err){
			res.send(err);
			console.log(err);
		}
		else {
			res.send("Successfully Created Volunteer");
			console.log(volunteer);
		}
	});
}