
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
		it('should NOT POST an artist without first and last name', (done) => {

			let artist = {
				firstName: "Jim",
			}
			chai.request(app)
				.post('/api/artists')
				.send(artist)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('lastName');
					res.body.errors.lastName.should.have.property('kind').eql('required');
					done();
				});
		});
		it('should POST an artist', (done) => {

			let artist = {
				firstName: "Jim",
				lastName: "Smith"
			}
			chai.request(app)
				.post('/api/artists')
				.send(artist)
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Artist successfully added!');
					res.body.artist.should.have.property('firstName');
					res.body.artist.should.have.property('lastName');
					done();
				});
		});
	});


	describe('/GET:id artist', () => {
		it('should GET an artist by the given id', (done) => {
			let artist = new Artist({ firstName: "John", lastName: "Smith"});
			artist.save( (err, artist) => {
				chai.request(app)
					.get('/api/artists/' + artist.id)
					.send(artist)
					.end( (err, res) => {
						res.should.have.status(200);
						res.body.should.be.an('object');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('_id').eql(artist.id);
						done();
					});
			});
		});
	});


	describe('/PUT:id artist', () => {
		it('should UPDATE an artist, given the id', (done) => {
			let artist = new Artist({firstName: "John", lastName: "Smith"});
			artist.save( (err, artist) => {
				chai.request(app)
				.put('/api/artists/' + artist.id)
				.send({firstName: "David", lastName: "Smith"})
				.end( (err, res) => {
					res.should.have.status(200);
					res.body.should.be.an('object');
					res.body.should.have.property('message').eql('Artist updated!');
					res.body.artist.should.have.property('firstName').eql('David');
					done();
				});
			});
		});
	});









});

