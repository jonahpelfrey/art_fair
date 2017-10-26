'use strict';
/** 
 * =============================================================================
 * Imports
 * =============================================================================
 */
var Q = require('q');
var bcrypt = require('bcryptjs');
var Buyer = require('./models/buyer.js');
var Volunteer = require('./models/volunteer.js');
var Artist = require('./models/artist.js');
var Order = require('./models/order.js');

exports.testHash = function(){

	let hash = bcrypt.hashSync('password', 10);
	console.log(hash);

	if(bcrypt.compareSync('password', hash)) {
 		
 		console.log('Passwords Match');
	} 
	else {
 		
 		console.log('Passwords do not match');
	}
}

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

function createBuyer(){

	var p = Q.defer();

	var b = new Buyer();
	b.firstName = "David";
	b.lastName = "Anderson";
	b.address.street = "1500 W. Gorham St";
	b.address.city = "Madison";
	b.address.state = "WI";
	b.address.zip = "53703";
	b.phoneNumber = "800-212-2320";
	b.email = "danderson@gmail.com";

	b.save(function(err, buyer){
		if(err) p.reject(err);
		else { p.resolve(buyer); }
	});

	return p.promise;

}

function createOrder(){

	var p = Q.defer();

	var o = new Order();
	o.refKey = 567;
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

/** 
 * =============================================================================
 * Public Functions
 * =============================================================================
 */
exports.generateModels = function(){
	var promises = [];

	promises.push(createBuyer());
	promises.push(createArtist());
	promises.push(createVolunteer());
	promises.push(createOrder());

	Q.all(promises).then(function(results){

		console.log("Buyer: " + results[0]._id);
		console.log("Artist: " + results[1]._id);
		console.log("Volunteer: " + results[2]._id);

		var id = results[3]._id;
		Order.findOne({ _id: id })
		.then(function(order){

			order.buyer = results[0]._id;
			order.artist = results[1]._id;
			order.volunteer = results[2]._id;

			order.save(function(error, order){
				if(error) console.log(error);
				else { console.log(order); }
			});

		}, function(error){
			console.log(error);
		});
	});
}

exports.createGroup = function(){

	var a = new Artist();
	a.firstName = 'John';
	a.lastName = 'Smith';

	var b = new Artist();
	b.firstName = "Tom";
	b.lastName = "Johnson";

	a.save(function(err, artist){
		if(err) console.log(err);
		else { console.log(artist) }
	});

	b.save(function(err, artist){
		if(err) console.log(err);
		else { console.log(artist) }
	});
}









