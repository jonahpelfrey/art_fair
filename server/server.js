/** 
* =============================================================================
* Imports
* =============================================================================
*/
require('dotenv').config();

var express 	= require('express');
var Q 			= require('q');
var app 		= express();
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var server 		= require('http').createServer(app);
var seed 		= require('./seed.js');

var SessionManager = require('./session/session');

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
    seed.createGroup();
});


/** 
* =============================================================================
* Config
* =============================================================================
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
module.exports = app;


/** 
* =============================================================================
* Middleware
* =============================================================================
*/
SessionManager.initialize(app);


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
app.use('/api/buyers', require('./api/buyers/route'));
app.use('/api/artists', require('./api/artists/route'));
app.use('/api/orders', require('./api/orders/route'));
app.use('/api/volunteers', require('./api/volunteers/route'));
app.use('/api/dashboard', require('./api/general/route'));
app.use('/', require('./api/auth/route'));


/** 
* =============================================================================
* Final Setup
* =============================================================================
*/
server.listen(process.env.PORT || '8080');
console.log('Magic happens on port ');