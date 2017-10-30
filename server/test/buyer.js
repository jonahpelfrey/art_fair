let mongoose = require('mongoose');
let Buyer = require('../models/buyer');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should= chai.should();

const app = require('../server');
chai.use(chaiHttp);

describe('Buyers', () => {

	beforeEach((done) => {
		Buyer.remove({}, (err) => {
			done();
		});
	});

	describe('/GET buyers', () => {
		it('it should GET all buyers', (done) => {
			chai.request(app)
				.get('/api/buyers')
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST buyer', () => {
		it('should NOT POST a buyer without all required fields', (done) => {

			let buyer = {
				firstName: "Jim",
				lastName: "Smith",
				address: {
					street: "Main St",
					city: "Madison",
					state: "WI",
					zip: 53703,
				},
				phoneNumber: 6513233033,
				member: false
			}
			chai.request(app)
				.post('/api/buyers')
				.send(buyer)
				.end( (err, res) => {
					res.should.have.status(400);
					res.body.should.be.an('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('email');
					res.body.errors.email.should.have.property('kind').eql('required');
					done();
				});
		});
		it('should POST a buyer', (done) => {

			let buyer = {
				firstName: "Jim",
				lastName: "Smith",
				address: {
					street: "Main St",
					city: "Madison",
					state: "WI",
					zip: 53703
				},
				phoneNumber: 6513233033,
				email: "jim@gmail.com",
				member: false
			}
			chai.request(app)
				.post('/api/buyers')
				.send(buyer)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Buyer successfully added!');
					res.body.result.should.have.property('firstName');
					res.body.result.should.have.property('lastName');
					res.body.result.should.have.property('address');
					res.body.result.should.have.property('phoneNumber');
					res.body.result.should.have.property('email');
					res.body.result.should.have.property('member');
					done();
				});
		});
	});

	describe('/GET:id buyer', () => {
		it('should GET a buyer by the given id', (done) => {
			let buyer = new Buyer({ 
				firstName: "Jim",
				lastName: "Smith",
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
			buyer.save( (err, buyer) => {
				chai.request(app)
					.get('/api/buyers/' + buyer.id)
					.send(buyer)
					.end( (err, res) => {
						res.should.have.status(200);
						res.body.should.be.an('object');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('address');
						res.body.should.have.property('phoneNumber');
						res.body.should.have.property('email');
						res.body.should.have.property('member');
						res.body.should.have.property('_id').eql(buyer.id);
						done();
					});
			});
		});
	});

	describe('/PUT:id buyer', () => {
		it('should UPDATE a buyer, given the id', (done) => {
			let buyer = new Buyer({ 
				firstName: "Jim",
				lastName: "Smith",
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
			buyer.save( (err, buyer) => {
				chai.request(app)
				.put('/api/buyers/' + buyer.id)
				.send({firstName: "David", lastName: "Smith"})
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Buyer updated!');
					res.body.result.should.have.property('firstName').eql('David');
					done();
				});
			});
		});
	});


	describe('/DELETE:id buyer', () => {
		it('should DELETE a buyer given the id', (done) => {
			let buyer = new Buyer({ 
				firstName: "Jim",
				lastName: "Smith",
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
			buyer.save( (err, buyer) => {
				chai.request(app)
				.delete('/api/buyers/' + buyer.id)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Buyer successfully deleted!');
					done();
				});
			});
		});
	});


});