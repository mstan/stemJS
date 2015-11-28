/*****************************************
*  Load social media footer from table   *
******************************************/

/*
	/!\ TODO: Modify this module to instead read from memory on startup and on modification from the ACP. 
						This will be to improve efficiency by loading from memory most of the time, instead of from
						disk.
*/

/*
	This module pulls the socialMedia table and passes it off as a token.
*/


module.exports = function (req,res,next) {
  req.db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
      res.locals.socialMedia  = row;
      socialMedia = res.locals.socialMedia;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)