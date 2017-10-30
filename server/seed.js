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
 		
 		console.log('Passwords do not match each other');
	}
}

function createArtist(){

	var p = Q.defer();

	let a = new Artist({
		firstName: "John",
		lastName: "Artist",
		phoneNumber: 6514143023,
		email: "artist@gmail.com",
		signature: "mySignature",
		username: "Jim1",
		password: "jimspassword"
	});

	a.save(function(err, artist){
		if(err) p.reject(err);
		else { p.resolve(artist); }
	});

	return p.promise;
}

function createVolunteer(){

	var p = Q.defer();

	let v = new Volunteer({ 
		firstName: "Jim",
		lastName: "Volunteer",
		username: "smithy",
		password: "password"
	});

	v.save(function(err, volunteer){
		if(err) p.reject(err);
		else { p.resolve(volunteer); }
	});

	return p.promise;
}

function createBuyer(){

	var p = Q.defer();

	let b = new Buyer({ 
		firstName: "Steve",
		lastName: "Buyer",
		address: {
			street: "Main St",
			city: "Madison",
			state: "WI",
			zip: 53703
		},
		phoneNumber: 6513233033,
		email: "jim@gmail.com",
		member: false
	});

	b.save(function(err, buyer){
		if(err) p.reject(err);
		else { p.resolve(buyer); }
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

	Q.all(promises).then(function(results){

		var order = new Order();
		order.buyer = results[0]._id;
		order.artist = results[1]._id;
		order.volunteer = results[2]._id;
		order.refKey = 456;
		order.price = 1000;

		order.save(function(error, order){
			if(error) console.log(error);
			else { console.log(order); }
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









