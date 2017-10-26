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

	v.save(function(err, result){
		if(err) res.send(err);
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