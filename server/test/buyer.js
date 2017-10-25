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
})