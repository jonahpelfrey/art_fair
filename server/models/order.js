var mongoose = require('mongoose');
var Volunteer = require('./volunteer.js');
var Schema = mongoose.Schema;

var Order = new Schema({

	id: {
		type: Number,
		required: true,
		default: 0
	},

	artist: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
		required: true
	},

	writer: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
		required: true,
	},

	date: {
		type: Date,
		default: Date.now
	},

	description: {
		type: String
	},

	price: {
		type: Number
	},

	shipping: {
		type: Number,
		default: 0
	},

});

module.exports = mongoose.model('Order', Order);