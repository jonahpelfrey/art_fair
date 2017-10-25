'use strict';

/** 
* =============================================================================
* Imports
* =============================================================================
*/


/** 
* =============================================================================
* Public Functions
* =============================================================================
*/
exports.showDashboard = function(req, res){

	if(req.session.views){
		req.session.views++;
		req.session.save();
		res.end("Dashboard Route | Views: " + req.session.views);
	}
	else {
		req.session.views = 1;
		req.session.save();
		res.end("Dashboard Route");
	}
}