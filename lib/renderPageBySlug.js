/*****************************************
*       Build variables from token       *
******************************************/

module.exports = function (req,res) {
  page = req.page;

  var navbarTitle = page.navbarTitle;
  var articleHeader = page.articleHeader;
  var articleContent = page.articleContent;

  //res.send(navbarTitle, articleContent, articleHeader);
  res.render('deiform/one-column.ejs', {page: page});
};