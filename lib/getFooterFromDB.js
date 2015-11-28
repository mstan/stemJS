/*****************************************
*      Load footer from table            *
******************************************/

/*
	/!\ TODO: Modify this module to instead read from memory on startup and on modification from the ACP. 
						This will be to improve efficiency by loading from memory most of the time, instead of from
						disk.
*/

/*
	This module pulls ALL entries from the footer table with each being an object.

	Each object contains the following: id,header,links,priority

	id - ID of the entry. Autogenerate, auto increment. 

	priority - Where the entry should appear in the list. Lowest number comes first (leftmost).
	
	header - Name & URL of the entry. Format is NAME|URL. When being passed to the footer.ejs, the entries are handled by being split at the |.

	links - Name & URL of all drop-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL. When passed to Footer EJS, the entries
             by splitting each NAME|URL by ;, then each individual split is handled by splitting at the |, as it is with header


*/


module.exports = function (req,res,next) {
  req.db.all('SELECT * FROM footer', function (err,rows) {
      res.locals.footerSections  = rows
      footerSections = res.locals.footerSections;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)