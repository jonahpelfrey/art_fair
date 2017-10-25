
module.exports = function(io){

	function initialize(){

		io.on('connection', function(socket) {  
    		console.log('Client connected | ID: ' + socket.id);

    		socket.on('disconnect', function(){
    			console.log('User has disconnected');
    		});

		});
	}

	return { initialize: initialize }
}