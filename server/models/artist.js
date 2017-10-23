var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Artist = new Schema({

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Artist', Artist);