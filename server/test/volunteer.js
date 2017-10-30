let mongoose = require('mongoose');
let Volunteer = require('../models/volunteer');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should= chai.should();

const app = require('../server');
chai.use(chaiHttp);

describe('Volunteers', () => {

	beforeEach((done) => {
		Volunteer.remove({}, (err) => {
			done();
		});
	});

	describe('/GET volunteers', () => {
		it('it should GET all volunteers', (done) => {
			chai.request(app)
				.get('/api/volunteers')
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST volunteers', () => {
		it('should NOT POST a volunteer without all required fields', (done) => {

			let volunteer = {
				firstName: "Jim",
				lastName: "Smith",
				username: "smithy",
			}
			chai.request(app)
				.post('/api/volunteers')
				.send(volunteer)
				.end( (err, res) => {
					res.should.have.status(400);
					res.body.should.be.an('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('password');
					res.body.errors.password.should.have.property('kind').eql('required');
					done();
				});
		});
		it('should POST a volunteer', (done) => {

			let volunteer = {
				firstName: "Jim",
				lastName: "Smith",
				username: "smithy",
				password: "password"
			}
			chai.request(app)
				.post('/api/volunteers')
				.send(volunteer)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Volunteer successfully added!');
					res.body.result.should.have.property('firstName');
					res.body.result.should.have.property('lastName');
					done();
				});
		});
	});

	describe('/GET:id volunteer', () => {
		it('should GET a volunteer by the given id', (done) => {
			let volunteer = new Volunteer({ 
				firstName: "Jim",
				lastName: "Smith",
				username: "smithy",
				password: "password"
			});
			volunteer.save( (err, volunteer) => {
				chai.request(app)
					.get('/api/volunteers/' + volunteer.id)
					.send(volunteer)
					.end( (err, res) => {
						res.should.have.status(200);
						res.body.should.be.an('object');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('_id').eql(volunteer.id);
						done();
					});
			});
		});
	});

	describe('/PUT:id volunteer', () => {
		it('should UPDATE a volunteer, given the id', (done) => {
			let volunteer = new Volunteer({ 
				firstName: "Jim",
				lastName: "Smith",
				username: "smithy",
				password: "password"
			});
			volunteer.save( (err, volunteer) => {
				chai.request(app)
				.put('/api/volunteers/' + volunteer.id)
				.send({firstName: "David"})
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Volunteer updated!');
					res.body.result.should.have.property('firstName').eql('David');
					done();
				});
			});
		});
	});

	describe('/DELETE:id volunteer', () => {
		it('should DELETE a volunteer given the id', (done) => {
			let volunteer = new Volunteer({ 
				firstName: "Jim",
				lastName: "Smith",
				username: "smithy",
				password: "password"
			});
			volunteer.save( (err, volunteer) => {
				chai.request(app)
				.delete('/api/volunteers/' + volunteer.id)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Volunteer successfully deleted!');
					done();
				});
			});
		});
	});

});