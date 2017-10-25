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
});