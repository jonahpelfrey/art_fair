var express = 		require('express');
var app = 			express();
var morgan = 		require('morgan');
var mongoose = 		require('mongoose');
var bodyParser = 	require('body-parser');
var server = 		require('http').createServer(app);

/** 
 * =============================================================================
 * Mongo Schemas
 * =============================================================================
 */
 var Artist = 		require('./models/artist.js');
 var Volunteer = 	require('./models/volunteer.js');
 var Order = 		require('./models/order.js');

/** 
 * =============================================================================
 * Mongo Database
 * =============================================================================
 */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/artfair");
// mongoose.connect("mongodb://localhost/rideswap")

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
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