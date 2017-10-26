/** 
* =============================================================================
* Imports
* =============================================================================
*/
var session	= require('express-session');
var bcrypt = require('bcryptjs');

 
/** 
* =============================================================================
* Public Functions
* =============================================================================
*/
module.exports = function(app){

	function enableLogging(){

		app.use(function printSession(req, res, next){
			console.log('req.session', req.session);
		  	return next();
		});
	}

	function initialize(){

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
	}

	return { enableLogging: enableLogging, initialize: initialize}
}
