'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Q = require('q');
var Order = require('./models/order.js').Order;
var Volunteer = require('./models/order.js').Volunteer;
var Artist = require('./models/order.js').Artist;

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */

function createArtist(){

	var p = Q.defer();

	var a = new Artist();
	a.firstName = 'John';
	a.lastName = 'Smith';

	a.save(function(err, artist){
		if(err) p.reject(err);
		else { p.resolve(artist); }
	});

	return p.promise;
}

function createVolunteer(){

	var p = Q.defer();

	var v = new Volunteer();
	v.firstName = 'Jane';
	v.lastName = 'Doe';

	v.save(function(err, volunteer){
		if(err) p.reject(err);
		else { p.resolve(volunteer); }
	});

	return p.promise;
}


function createOrder(){

	var p = Q.defer();

	var o = new Order();
	o.id = 567;
	o.description = "This is a new order";
	o.price = 100;

	o.save(function(err, order){
		if(err) {
			console.log(err);
			p.reject(err);
		}

		else p.resolve(order);
	});

	return p.promise;
}

exports.populateDB = function(){

	var promises = [];

	promises.push(createArtist());
	promises.push(createVolunteer());
	promises.push(createOrder());

	Q.all(promises).then(function(data){
		Order.findOne({price: 100}, function(err, order){
			if(err) console.log(err);
			else {
				Artist.findOne({firstName: "John"}, function(err, artist){
					if(err) console.log(err);
					else {
						order.artist = artist._id;
						console.log("Artist ID: " + artist._id);

						order.save(function(err, order){
							if(err) console.log(err);

							console.log(order);
						});
					}
				});
			}

		});
	});
}










