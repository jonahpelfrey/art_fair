'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Order = require('../../models/order.js');
var Buyer = require('../../models/buyer.js');
var Artist = require('../../models/artist.js');
var Volunteer = require('../../models/volunteer.js');
var Q = require('q');

/** 
 * =============================================================================
 * Private Functions
 * =============================================================================
 */
function getArtistForOrder(id){

	var p = Q.defer();

	Artist.findOne({_id: id})
		.then(function(result){
			p.resolve(result);
		}, function(err){
			p.reject(err);
		});

	return p.promise;
}

function getBuyerForOrder(id){

	var p = Q.defer();

	Buyer.findOne({ _id: id })
		.then(function(result){
			p.resolve(result);
		}, function(error){
			p.reject(error);
		});

	return p.promise;
}

function getVolunteerForOrder(id) {

	var p = Q.defer();

	Volunteer.findOne({_id: id})
		.then(function(result){
			p.resolve(result);
		}, function(err){
			p.reject(err);
		});

	return p.promise;
}

function addOrderToBuyer(buyerId, orderId) {

	var p = Q.defer();

	Buyer.findOne({_id: buyerId})
		.then(function(buyer){

			buyer.orders.push(orderId);
			buyer.save(function(err, result){
				if(err) p.reject(err);
				else { p.resolve(result); }
			});

		}, function(err){
			p.reject(err);
		});

	return p.promise;
}

function removeOrderFromBuyer(buyerId, orderId) {

	var p = Q.defer();

	Buyer.findOne({_id: buyerId})
		.then(function(buyer){

			buyer.orders.remove(orderId);
			buyer.save(function(err, result){
				if(err) p.reject(err);
				else { p.resolve(result); }
			});
			
		}, function(err){
			p.reject(err);
		});

	return p.promise;
}

function generateRefKey() {

	//TODO
}

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.getOrderById = function(req, res) {
	Order.findOne({ _id: req.params.id})
		.then(function(order){
			res.json(order);
		}, function(err){
			res.send(err);
		});
}

exports.getAllOrders = function(req, res){
	Order.find({})
		.then(function(orders){
			res.send(orders);
		}, function(error){
			res.send(error);
		});
}

exports.updateOrder = function(req, res){
	Order.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, function(err, result){
		if(err) res.send(err);
		else {
			res.json({message: "Order updated!", result});
		}
	});
}
exports.createOrder = function(req, res) {

	var promises = [];

	promises.push(getBuyerForOrder(req.body.buyer));
	promises.push(getArtistForOrder(req.body.artist));
	promises.push(getVolunteerForOrder(req.body.volunteer));

	Q.all(promises).then(function(results){

		var o = new Order();
		o.refKey = req.body.refKey;
		o.price = req.body.price;
		o.buyer = results[0]._id;
		o.artist = results[1]._id;
		o.volunteer = results[2]._id;

		o.save(function(err, result){
			if(err) res.status(400).send(err)
			else {
				var buyerPromise = addOrderToBuyer(result.buyer, result._id)
					.then(function(buyer){
						res.json({message: "Order successfully added!", result});
					}, function(error){
						res.status(400).send(error);
					});
			}
		});
	});
}

exports.removeOrderById = function(req, res){
	Order.findOneAndRemove({ _id: req.params.id}, function(err, result){
		if(err) res.send(err);
		else {
			res.json({message: "Order successfully deleted!", result});
		}
	});
}