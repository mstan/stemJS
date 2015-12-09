/*****************************************
*       Used Logged in Check             *
******************************************/
var authCheck = function (req,res,next) {
	if (req.user != null) {
		next();
	} else {
		res.redirect('/auth');
	} // end else
};


module.exports = {
	authCheck: authCheck
};