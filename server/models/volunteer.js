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
	},

	username: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	}
});

volunteerSchema.methods.fullName = function(){
	var fullName = this.firstName + " " + this.lastName;
	return fullName;
};

module.exports = mongoose.model('Volunteer', volunteerSchema);