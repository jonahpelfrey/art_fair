var express 	= require('express');
var Q 			= require('q');
var app 		= express();
var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');
var server 		= require('http').createServer(app);

/** 
 * =============================================================================
 * API
 * =============================================================================
 */
 var Artist 	= require('./models/artist.js');
 var retrieval 	= require('./api/artists/artist.controller.js');
 var Volunteer 	= require('./models/volunteer.js');
 var Order 		= require('./models/order.js');
 var OrderController = require('./api/orders/orders.controller.js');
 var seed 		= require('./seed.js');
 var promises 	= [];

/** 
 * =============================================================================
 * Mongo Database
 * =============================================================================
 */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/artfair");
// mongoose.connect("mongodb://localhost/rideswap")

mongoose.Promise = require('q').Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");

    // promises.push(seed.populateDB());

    // Q.all(promises).then(function(data){
    // 	console.log("PROMISES FINISHED");
    // 	var req = {
    // 		firstName: "John",
    // 		lastName: "Smith"
    // 	}

    // 	retrieval.getArtist(req);

    // });
    promises.push(seed.createVolunteer());
    promises.push(seed.createArtist());

    Q.all(promises).then(function(data){

    	console.log("Volunteer: " + data[0]._id);
    	console.log("Artist: " + data[1]._id);

    	var params = {
    		id: 12345,
    		description: "This is a test",
    		price: 475,
    		shipping: 0,
    		volunteerID: data[0]._id,
    		artistID: data[1]._id,
    	}

    	OrderController.createOrder(params);
    });
    
});

/** 
 * =============================================================================
 * Config
 * =============================================================================
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
	res.json("Welcome to the artfair API!");
});

app.use('/api', router);

/** 
 * =============================================================================
 * Final Setup
 * =============================================================================
 */

server.listen(process.env.PORT || '8080');
// server.listen('8081');
console.log('Magic happens on port ');
exports = module.exports = app;