
let mongoose = require('mongoose');
let Artist = require('../models/artist');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should= chai.should();

const app = require('../server');
chai.use(chaiHttp);

describe('Artists', () => {

	beforeEach((done) => {
		Artist.remove({}, (err) => {
			done();
		});
	});

	describe('/GET artists', () => {
		it('it should GET all artists', (done) => {
			chai.request(app)
				.get('/api/artists')
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST artist', () => {
		it('should NOT POST an artist without all required fields', (done) => {

			let artist = {
				firstName: "John",
				lastName: "Smith",
				phoneNumber: 6514143023,
				email: "artist@gmail.com",
				signature: "mySignature",
				username: "Jim1",
			}
			chai.request(app)
				.post('/api/artists')
				.send(artist)
				.end( (err, res) => {
					res.should.have.status(400);
					res.body.should.be.an('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('password');
					res.body.errors.password.should.have.property('kind').eql('required');
					done();
				});
		});
		it('should POST an artist', (done) => {

			let artist = {
				firstName: "John",
				lastName: "Smith",
				phoneNumber: 6514143023,
				email: "artist@gmail.com",
				signature: "mySignature",
				username: "Jim1",
				password: "jimspassword"
			}
			chai.request(app)
				.post('/api/artists')
				.send(artist)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Artist successfully added!');
					res.body.result.should.have.property('firstName');
					res.body.result.should.have.property('lastName');
					res.body.result.should.have.property('phoneNumber');
					res.body.result.should.have.property('email');
					res.body.result.should.have.property('signature');
					res.body.result.should.have.property('username');
					res.body.result.should.have.property('password');
					done();
				});
		});
	});


	describe('/GET:id artist', () => {
		it('should GET an artist by the given id', (done) => {
			let artist = new Artist({
				firstName: "John",
				lastName: "Smith",
				phoneNumber: 6514143023,
				email: "artist@gmail.com",
				signature: "mySignature",
				username: "Jim1",
				password: "jimspassword"
			});
			artist.save( (err, artist) => {
				chai.request(app)
					.get('/api/artists/' + artist.id)
					.send(artist)
					.end( (err, res) => {
						res.should.have.status(200);
						res.body.should.be.an('object');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('phoneNumber');
						res.body.should.have.property('email');
						res.body.should.have.property('signature');
						res.body.should.have.property('username');
						res.body.should.have.property('password');
						res.body.should.have.property('_id').eql(artist.id);
						done();
					});
			});
		});
	});


	describe('/PUT:id artist', () => {
		it('should UPDATE an artist, given the id', (done) => {
			let artist = new Artist({
				firstName: "John",
				lastName: "Smith",
				phoneNumber: 6514143023,
				email: "artist@gmail.com",
				signature: "mySignature",
				username: "Jim1",
				password: "jimspassword"
			});
			artist.save( (err, artist) => {
				chai.request(app)
				.put('/api/artists/' + artist.id)
				.send({firstName: "David", lastName: "Smith"})
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Artist updated!');
					res.body.result.should.have.property('firstName').eql('David');
					done();
				});
			});
		});
	});


	describe('/DELETE:id artist', () => {
		it('should DELETE an artist given the id', (done) => {
			let artist = new Artist({
				firstName: "John",
				lastName: "Smith",
				phoneNumber: 6514143023,
				email: "artist@gmail.com",
				signature: "mySignature",
				username: "Jim1",
				password: "jimspassword"
			});
			artist.save( (err, artist) => {
				chai.request(app)
				.delete('/api/artists/' + artist.id)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Artist successfully deleted!');
					done();
				});
			});
		});
	});


});