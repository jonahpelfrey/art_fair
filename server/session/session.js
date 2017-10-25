/** 
* =============================================================================
* Imports
* =============================================================================
*/
var session	= require('express-session');
var bcrypt = require('bcryptjs');


/** 
* =============================================================================
* Private Functions
* =============================================================================
*/
function createToken(){

	var hashedPassword = bcrypt.hashSync("mypassword", 8);
}

function validateToken(password){

	var isValid = brcypt.compareSync(password, "mypassword");

	if(!isValid){

	}
}


/** 
* =============================================================================
* Public Functions
* =============================================================================
*/
exports.initialize = function(app){

	var MemoryStore = session.MemoryStore;

	var sessionOpts = {
		name: 'id',
		saveUninitialized: true, 						
		resave: false, 									
		store: new MemoryStore(),
		secret: process.env.SECRET,
		cookie : { 
			httpOnly: false,
			path: process.env.COOKIE_PATH,
			maxAge: 3600000,
		} 
	}

	//Add session to app
	app.use(session(sessionOpts));

	//Add middleware to validate cookie token
	app.use(function validateToken(req, res, next){
		return next();
	});

	//Generate new session for a user who has logged in 
	session.Session.prototype.login = function (user, cb) {

		const req = this.req;
		req.session.regenerate(function(err){
			if(err){
		    	cb(err);
		  	}
		});
		req.session.userInfo = user;
		cb();
	};
}

exports.enableLogging = function(app){

	//Print Session Information For Debugging
	app.use(function printSession(req, res, next){
		console.log('req.session', req.session);
	  	return next();
	});
}


