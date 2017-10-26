let mongoose = require('mongoose');
let Order = require('../models/order');
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