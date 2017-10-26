var mongoose = require('mongoose');
var Artist = require('./artist.js');
var Volunteer = require('./volunteer.js');
var Buyer = require('./buyer.js');
var Schema = mongoose.Schema; 

var orderSchema = new Schema({

	refKey: {
		type: Number,
		required: true,
		default: 0
	},

	artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },

	volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true},

	buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true},

	date: {
		type: Date,
		default: Date.now
	},

	description: {
		type: String
	},

	price: {
		type: Number,
		required: true
	},

	shipping: {
		type: Number,
		default: 0
	},

});

module.exports = mongoose.model('Order', orderSchema);