var mongoose = require('mongoose');
var Order = require('./order.js');
var Schema = mongoose.Schema;

var buyerSchema = new Schema({

	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	address: {
		street: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		zip: {
			type: Number,
			required: true
		}
	},

	phoneNumber: {
		type: Number,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	member: {
		type: Boolean,
		required: true
	},

	orders: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
		default: []
	}

})

buyerSchema.methods.fullName = function(){
	var fullName = this.firstName + " " + this.lastName;
	return fullName;
};

module.exports = mongoose.model('Buyer', buyerSchema);