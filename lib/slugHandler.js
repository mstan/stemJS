/*****************************************
*       Look up page content by slug     *
******************************************/

var getFromDB = function (req,res,next,slug) {
// 1) Look it up. Does it exist?
  req.db.get('SELECT * FROM pages WHERE slug = ?', [ slug ], function (err,row) {
// 2a) It exists
    if(row) {
      req.page = row;
      return next();
    } else {
// 2b) It didn't exist      
      res.status(404).send('Page Not Found');
    } // end if-else
  }); // end req.db.get
}; //End function(req,res,next,id)


/*****************************************
*       Build variables from token       *
******************************************/

var renderPage = function (req,res) {
  page = req.page;

  var navbarTitle = page.navbarTitle;
  var articleHeader = page.articleHeader;
  var articleContent = page.articleContent;

  //res.send(navbarTitle, articleContent, articleHeader);
  res.render('deiform/one-column.ejs', {page: page});
};


module.exports = {
	getFromDB: getFromDB,
	renderPage: renderPage
};
