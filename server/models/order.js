var mongoose = require('mongoose');
var Artist = require('./artist.js');
var Volunteer = require('./volunteer.js');
var Buyer = require('./buyer.js');
var Schema = mongoose.Schema;

var orderSchema = new Schema({

	id: {
		type: Number,
		required: true,
		default: 0
	},

	artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },

	volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},

	buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer'},

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

module.exports = mongoose.model('Order', orderSchema);