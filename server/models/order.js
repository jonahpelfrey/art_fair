var mongoose = require('mongoose');
var Artist = require('./artist.js');
var Volunteer = require('./volunteer.js');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema({

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	}
});
var Volunteer = mongoose.model('Volunteer', volunteerSchema);

var artistSchema = new Schema({

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},
});
var Artist = mongoose.model('Artist', artistSchema);

var orderSchema = new Schema({

	id: {
		type: Number,
		required: true,
		default: 0
	},

	artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },

	volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer'},

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
var Order = mongoose.model('Order', orderSchema);

module.exports = {
	Order: Order,
	Artist: Artist,
	Volunteer: Volunteer
}