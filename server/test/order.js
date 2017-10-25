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


	
})