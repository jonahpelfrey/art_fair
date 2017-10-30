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

	describe('/POST order', () => {

		it('should NOT POST an order without all required fields', (done) => {

			var promises = [];

			promises.push(artistSeed());
			promises.push(volunteerSeed());
			promises.push(buyerSeed());

			Q.all(promises).then(function(results){
				let order = {
					refKey: 123,
					artist: results[0]._id,
					volunteer: results[1]._id,
					buyer: results[2]._id,
				}
				chai.request(app)
					.post('/api/orders')
					.send(order)
					.end( (err, res) => {
						res.should.have.status(400);
						res.body.should.be.an('object');
						res.body.should.have.property('errors');
						res.body.errors.should.have.property('price');
						res.body.errors.price.should.have.property('kind').eql('required');
						done();
					});

			});
			
		});



	});

	describe('/POST order', () => {

		it('should POST an order', (done) => {

			var promises = [];

			promises.push(artistSeed());
			promises.push(volunteerSeed());
			promises.push(buyerSeed());

			Q.all(promises).then(function(results){
				let order = {
					refKey: 123,
					artist: results[0]._id,
					volunteer: results[1]._id,
					buyer: results[2]._id,
					price: 1000
				}
				chai.request(app)
					.post('/api/orders')
					.send(order)
					.end( (err, res) => {
						res.should.have.status(200);
						res.body.should.be.an('object');
						res.body.should.have.property('message').eql('Order successfully added!');
						res.body.result.should.have.property('refKey');
						res.body.result.should.have.property('artist').eql(results[0]._id.toString());
						res.body.result.should.have.property('volunteer').eql(results[1]._id.toString());
						res.body.result.should.have.property('buyer').eql(results[2]._id.toString());
						res.body.result.should.have.property('price');
						done();
					});

			});
			
		});



	});

	describe('/GET:id order', () => {

		it('should GET an order by the given id', (done) => {

			var promises = [];

			promises.push(artistSeed());
			promises.push(volunteerSeed());
			promises.push(buyerSeed());

			Q.all(promises).then(function(results){
				let order = new Order({
					refKey: 123,
					artist: results[0]._id,
					volunteer: results[1]._id,
					buyer: results[2]._id,
					price: 1000
				});
				order.save( (err, order) => {
					chai.request(app)
						.get('/api/orders/' + order.id)
						.send(order)
						.end( (err, res) => {
							res.should.have.status(200);
							res.body.should.be.an('object');
							res.body.should.have.property('refKey');
							res.body.should.have.property('artist');
							res.body.should.have.property('volunteer');
							res.body.should.have.property('buyer');
							res.body.should.have.property('price');
							res.body.should.have.property('_id').eql(order.id);
							done();
						});
				});
			});
			
		});

	});

	describe('/PUT:id order', () => {

		it('should PUT an order by the given id', (done) => {

			var promises = [];

			promises.push(artistSeed());
			promises.push(volunteerSeed());
			promises.push(buyerSeed());

			Q.all(promises).then(function(results){
				let order = new Order({
					refKey: 123,
					artist: results[0]._id,
					volunteer: results[1]._id,
					buyer: results[2]._id,
					price: 1000
				});
				order.save( (err, order) => {
					chai.request(app)
						.put('/api/orders/' + order.id)
						.send({refKey: 456})
						.end( (err, res) => {
							res.should.have.status(200);
							res.body.should.be.an('object');
							res.body.should.have.property('message').eql('Order updated!');
							res.body.result.should.have.property('refKey').eql(456);
							done();
						});
				});
			});
			
		});

	});

	describe('/DELETE:id order', () => {

		it('should DELETE an order by the given id', (done) => {

			var promises = [];

			promises.push(artistSeed());
			promises.push(volunteerSeed());
			promises.push(buyerSeed());

			Q.all(promises).then(function(results){
				let order = new Order({
					refKey: 123,
					artist: results[0]._id,
					volunteer: results[1]._id,
					buyer: results[2]._id,
					price: 1000
				});
				order.save( (err, order) => {
					chai.request(app)
						.delete('/api/orders/' + order.id)
						.end( (err, res) => {
							res.should.have.status(200);
							res.body.should.be.an('object');
							res.body.should.have.property('message').eql('Order successfully deleted!');
							done();
						});
				});
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
		phoneNumber: 6513233033,
		email: "jim@gmail.com",
		member: false
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
		lastName: "Smith",
		username: "smithy",
		password: "password"
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
		firstName: "John",
		lastName: "Smith",
		phoneNumber: 6514143023,
		email: "artist@gmail.com",
		signature: "mySignature",
		username: "Jim1",
		password: "jimspassword"
	});

	artist.save(function(err, result){
		if(err) p.reject(err);
		else {
			p.resolve(result);
		}
	});

	return p.promise;
}    