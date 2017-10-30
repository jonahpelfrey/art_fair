var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	phoneNumber: {
		type: Number,
		required: true,
	},

	email: {
		type: String,
		required: true
	},

	signature: {
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

artistSchema.methods.fullName = function(){
	var fullName = this.firstName + " " + this.lastName;
	return fullName;
};

module.exports = mongoose.model('Artist', artistSchema);