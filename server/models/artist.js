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
});

artistSchema.methods.fullName = function(){
	var fullName = this.firstName + " " + this.lastName;
	return fullName;
};

module.exports = mongoose.model('Artist', artistSchema);