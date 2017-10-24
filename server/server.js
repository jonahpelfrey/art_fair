/** 
* =============================================================================
* Imports
* =============================================================================
*/
require('dotenv').config();

var express 	= require('express');
var session		= require('express-session');
var MongoStore 	= require('connect-mongo')(session);
var Q 			= require('q');
var app 		= express();
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var server 		= require('http').createServer(app);
var seed 		= require('./seed.js');

/** 
* =============================================================================
* API
* =============================================================================
*/
var Artist 		= require('./models/artist.js');
var Buyer      	= require('./models/buyer.js');
var Volunteer 	= require('./models/volunteer.js');
var Order 		= require('./models/order.js');

 
/** 
* =============================================================================
* Database
* =============================================================================
*/
mongoose.connect(process.env.MONGODB_URI || process.env.DB_HOST);
mongoose.Promise = require('q').Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");

    // seed.generateModels();
    // seed.testHash();
    
});

/** 
* =============================================================================
* Config
* =============================================================================
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 
* =============================================================================
* Middleware
* =============================================================================
*/
var sessionOpts = {
	name: 'id',
	saveUninitialized: true, 						
	resave: false, 									
	store: new MongoStore({
      url: process.env.DB_HOST,
      ttl: 3600000,
    }),
	secret: process.env.SECRET,
	cookie : { 
		httpOnly: true,
		path: process.env.COOKIE_PATH,
		maxAge: 3600000,
	} 
}

app.use(session(sessionOpts));

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


/** 
* =============================================================================
* Tracking
* =============================================================================
*/
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});


/** 
* =============================================================================
* Routes
* =============================================================================
*/
app.use('/api/buyers', require('./api/buyers/route'));
app.use('/api/artists', require('./api/artists/route'));
app.use('/api/orders', require('./api/orders/route'));
app.use('/api/volunteers', require('./api/volunteers/route'));
app.use('/', require('./api/auth/route'));

/** 
* =============================================================================
* Final Setup
* =============================================================================
*/

server.listen(process.env.PORT || '8080');
console.log('Magic happens on port ');
exports = module.exports = app;