var mongoose = require('mongoose');
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

module.exports = mongoose.model('Volunteer', volunteerSchema);