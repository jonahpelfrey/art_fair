var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config.js');
var Admin = require('../../models/admin.js');

exports.register = function(){

	var hashedPassword = bcrypt.hashSync(config.password, 8);

	var user = new User();
	user.username = config.username;
	user.password = hashedPassword;

	user.save(function(err, user){
		if(err) console.log(err);
		else {
			var token = jwt.sign({ id: user._id}, config.secret, {
				expiresIn: 86400
			});
		}
	});
	
	res.status(200).send({auth: true, token: token});
}

exports.login = function(req, res){

	User.findOne({username: req.body.username}, function(err, user){

		if(err) return res.status(500).send('Error on the server.');
		if(!user) return res.status(404).send('No user found');

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

		var token = jwt.sign({ id: user._id}, config.secret, {
			expiresIn: 86400	//1 day
		});

		res.status(200).send({auth: true, token: token});
	});

}

exports.logout = function(req, res){
	res.status(200).send({auth: false, token: null});
}
