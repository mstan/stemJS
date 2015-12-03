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
}; //End getFromDB

/*****************************************
*       Pull all slugs from the table    *
******************************************/

var listAllPagesBySlug = function (req,res,next) {
  req.db.all('SELECT slug FROM pages', function (err,rows) {
    res.locals.pagesBySlug = rows;
    return next();
  });
}; //end listAllPagesBySlug

/*****************************************
*            Add New Page                *
******************************************/

var addNewPage = function (req,res) {
  var slug = req.body.slug;   
  var navbarTitle = req.body.navbarTitle;
  var articleHeader = req.body.articleHeader;
  var articleContent = req.body.articleContent;

  var newEntryToken = [slug,navbarTitle,articleHeader,articleContent]; 

  req.db.run('INSERT INTO pages (slug,NavbarTitle,articleHeader,articleContent) VALUES(?,?,?,?)', newEntryToken, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.redirect('/admin/pages');
    } //end if else
  }); // end req.db.run
}; // addNewPage

/*****************************************
*       Update single page identified    *
        by its slug                      *
******************************************/

var updatePageBySlug = function (req,res) {
  var navbarTitle = req.body.navbarTitle;
  var articleHeader = req.body.articleHeader;
  var articleContent = req.body.articleContent;
  var slug = req.body.slug; 

  var updateToken = [navbarTitle,articleHeader,articleContent,slug];  

  req.db.run('UPDATE pages SET navbarTitle=?, articleHeader=?, articleContent=? WHERE slug = ?', updateToken, function (err) {
    if(err) {
      res.send(err);
    } else {
      res.redirect('/admin/pages');
    } // end elsee
  }); // end req.db.run
} // end updatePageBySlug

/*****************************************
*       Remove single page identified    *
        by its slug                      *
******************************************/

var deletePageBySlug = function (req,res) {
  page = req.page;
  slug = page.slug;

  req.db.run('DELETE FROM pages WHERE slug=?', slug, function (err) {
    if(err) {
      res.send(err);
    } else {
      console.log(err);
      res.redirect('/admin/pages');
    } // end else
  }); // end req.db.run 
}  // end deletePageBySlug

module.exports = {
  getFromDB: getFromDB,
  listAllPagesBySlug: listAllPagesBySlug,
  addNewPage: addNewPage,
  updatePageBySlug: updatePageBySlug,
  deletePageBySlug: deletePageBySlug
};