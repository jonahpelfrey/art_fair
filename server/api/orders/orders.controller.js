'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Order = require('../../models/order.js');
var ArtistController = require('../artists/artist.controller.js');
var VolunteerController = require('../volunteers/volunteer.controller.js');
var BuyerController = require('../buyers/buyer.controller.js');
var Q = require('q');

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getOrder = function(req, res) {
	Order.findOne({ _id: req.id})
	.then(function(order){
		console.log(order);
	}, function(err){
		console.log(err);
	});
}

exports.getOrders = function(req, res){
	Order.find()
	.then(function(orders){
		res.send(orders);
	}, function(error){
		res.send(error);
	});
}

exports.createOrder = function(req, res) {

	var promises = [];
	promises.push(BuyerController.getBuyerForOrder(req.buyerId));
	promises.push(ArtistController.getArtistForOrder(req.artistId));
	promises.push(VolunteerController.getVolunteerForOrder(req.volunteerId));

	Q.all(promises).then(function(results){

		var o = new Order();
		o.id = req.id;
		o.description = req.description;
		o.price = req.price;
		o.shipping = req.shipping;
		o.buyer = results[0]._id;
		o.artist = results[1]._id;
		o.volunteer = results[2]._id;

		o.save(function(err, order){
			if(err){
				res.send(err);
				console.log(err);
			}
			else {
				res.send("Successfully Created Order");
				console.log(order);
			}
		});
	});
}