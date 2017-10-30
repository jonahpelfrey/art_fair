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
exports.getVolunteerById = function(req, res){
	Volunteer.findOne({ _id: req.params.id })
		.then(function(volunteer){
			res.json(volunteer);
		}, function(error){
			res.send(error);
		});
}

exports.getAllVolunteers = function(req, res){
	Volunteer.find({})
		.then(function(volunteers){
			res.send(volunteers);
		}, function(error){
			res.send(error);
		});
}

exports.updateVolunteer = function(req, res){
	Volunteer.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, function(err, result){
		if(err) res.send(err);
		else {
			res.json({message: "Volunteer updated!", result});
		}
	});
}

exports.createVolunteer = function(req, res) {

	var v = new Volunteer();
	v.firstName = req.body.firstName;
	v.lastName = req.body.lastName;
	v.username = req.body.username;
	v.password = req.body.password;

	v.save(function(err, result){
		if(err) res.status(400).send(err);
		else {
			res.json({message: "Volunteer successfully added!", result});
		}
	});
}

exports.removeVolunteerById = function(req, res){
	Volunteer.findOneAndRemove({ _id: req.params.id}, function(err, result){
		if(err) res.send(err);
		else {
			res.json({message: "Volunteer successfully deleted!", result});
		}
	});
}