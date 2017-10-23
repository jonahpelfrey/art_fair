'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Order = require('../../models/order.js');
var ArtistController = require('../artists/artist.controller.js');
var VolunteerController = require('../volunteers/volunteer.controller.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getOrder = function(req, res) {

	Order.findOne({id: req.id})
	.then(function(response){
		console.log(order);
	}, function(err){
		console.log(err);
	});
}

exports.createOrder = function(req) {

	var promises = [];
	promises.push(ArtistController.getArtist(req.artistID));
	promises.push(VolunteerController.getVolunteer(req.volunteerID));

	Q.all(promises).then(function(results){

		console.log("Promises have finished for the order");
		console.log("Order/Artist: " + results[0]._id);
		console.log("Order/Volunteer: " + results[1]._id);

		var o = new Order();
		o.id = req.id;
		o.description = req.description;
		o.price = req.price;
		o.shipping = req.shipping;
		o.artist = results[0]._id;
		o.volunteer = results[1]._id;

		o.save(function(err, order){
			if(err) console.log(err);
			console.log(order);
		});
	});
}