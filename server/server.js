require('dotenv').config();

var express 	= require('express');
var session		= require('express-session');
var MongoStore 	= require('connect-mongo')(session);
var Q 			= require('q');
var app 		= express();
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var cookieParser = require('cookie-parser');
var server 		= require('http').createServer(app);


/** 
 * =============================================================================
 * API
 * =============================================================================
 */
var Artist 	= require('./models/artist.js');
var Buyer      = require('./models/buyer.js');
var Volunteer 	= require('./models/volunteer.js');
var Order 		= require('./models/order.js');
var seed 		= require('./seed.js');
 

/** 
 * =============================================================================
 * Mongo Database
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
 * Session
 * =============================================================================
 */
var sessionOpts = {
	name: 'id',
	saveUninitialized: true, 						
	resave: false, 									
	store: new MongoStore({
      url: process.env.DB_HOST,
      ttl: process.env.DB_EXP,
    }),
	secret: process.env.SECRET,
	cookie : { 
		httpOnly: true, 
		maxAge: process.env.COOKIE_EXP,
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

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});

/** 
 * =============================================================================
 * Tracking
 * =============================================================================
 */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/** 
 * =============================================================================
 * Routes
 * =============================================================================
 */
var router = express.Router();

router.route('/')
.get(function(req, res){

	if(req.session.views) {
		// req.session.cookie.path = "/buyer";
		req.session.views++;
		res.end("This is the " + req.session.views + " view of this page!");
	}
	else {
		req.session.views = 1;
		res.end("First View!");
	}

});

router.route('/login')
.get(function(req, res){

	req.session.login(userInfo, function(err) {
    	if (err){
        	return res.status(500).send("There was an error logging in. Please try again.");
        }
    });
});

app.use('/api', router);
app.use('/api/buyers', require('./api/buyers/route'));
app.use('/api/artists', require('./api/artists/route'));
app.use('/api/orders', require('./api/orders/route'));
app.use('/api/volunteers', require('./api/volunteers/route'));

/** 
 * =============================================================================
 * Final Setup
 * =============================================================================
 */

server.listen(process.env.PORT || '8080');
console.log('Magic happens on port ');
exports = module.exports = app;