let mongoose = require('mongoose');
let Q = require('q');
let Order = require('../models/order');
let Artist = require('../models/artist');
let Volunteer = require('../models/volunteer');
let Buyer = require('../models/buyer');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should= chai.should();

const app = require('../server');
chai.use(chaiHttp);



describe('Orders', () => {

	beforeEach((done) => {
		Order.remove({}, (err) => {
			done();
		});
	});


	describe('/GET orders', () => {
		it('it should GET all orders', (done) => {
			chai.request(app)
				.get('/api/orders')
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

});

/** 
 * =============================================================================
 * Private Functions
 * =============================================================================
 */
function buyerSeed(){

	var p = Q.defer();

	let buyer = new Buyer({ 
		firstName: "Dave",
		lastName: "Johnson",
		address: {
			street: "Main St",
			city: "Madison",
			state: "WI",
			zip: 53703
		},
		phoneNumber: "651-323-3033",
		email: "jim@gmail.com"
	});

	buyer.save(function(err, result){
		if(err) p.reject(err);
		else {
			p.resolve(result);
		}
	});

	return p.promise;
}

function volunteerSeed(){

	var p = Q.defer();

	let volunteer = new Volunteer({
		firstName: "Jim",
		lastName: "Smith"
	});

	volunteer.save(function(err, result){
		if(err) p.reject(err);
		else {
			p.resolve(result);
		}
	});

	return p.promise
}

function artistSeed(){

	var p = Q.defer();

	let artist = new Artist({
		firstName: "Jane",
		lastName: "Doe"
	});

	artist.save(function(err, result){
		if(err) p.reject(err);
		else {
			p.resolve(result);
		}
	});

	return p.promise;
}    