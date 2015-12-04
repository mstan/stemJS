/*******************************
*        Packages & Deps       *
********************************/
var express = require('express'); 
var slugHandler = require('./lib/slugHandler.js');
var getConfigsFromDB = require('./lib/getConfigsFromDB.js');
var navigationHandler = require('./lib/navigationHandler.js');

/*******************************
*       Up & Running           *
********************************/
var admin = express(); 

/*******************************
*       Middleware             *
********************************/
//Parameter based middleware
admin.param('slug', slugHandler.getFromDB);


/*******************************
*           Routing            *
*	all routes are prefixed with *
*	/admin/ 										 *
********************************/
//Index Homepage
admin.get('/', function (req,res) {
	res.render('sbAdmin/index.ejs');
});

/*******************************
*        Routing - Pages       *
********************************/

//Pull all entries from the database by their slug
admin.get('/pages', slugHandler.listAllPagesBySlug, function (req,res) {
	res.render('sbAdmin/pages.ejs');
});

admin.get('/pages/add', function (req,res) {
	res.render('sbAdmin/addPage.ejs');
});

admin.post('/pages/add', slugHandler.addNewPage);

//Pull up an editor for a single page. Identified by its slug
admin.get('/pages/edit/:slug', function (req,res) {
  page = req.page;
  res.render('sbAdmin/editPage.ejs');
});

//Submission handler for actually modifying the page
admin.post('/pages/edit', slugHandler.updatePageBySlug);

//Remove the entirety of the entry from the database. identified by slug.
admin.get('/pages/delete/:slug', slugHandler.deletePageBySlug); //end admin.get

/*******************************
*     Routing - Navigation     *
********************************/

//Header
admin.get('/navigation/navbar', getConfigsFromDB.navbarConfig, function (req,res) {
	res.render('sbAdmin/editNavbar.ejs');
});
admin.post('/navigation/navbar', navigationHandler.updateNavbar);

//Sidebar Primary
admin.get('/navigation/sidebarPrimary', getConfigsFromDB.sidebarPrimaryConfig, function (req,res) {
	res.render('sbAdmin/editSidebarPrimary.ejs');
});
admin.post('/navigation/sidebarPrimary/', navigationHandler.updateSidebarPrimary);

//Sidebar Secondary
admin.get('/navigation/sidebarSecondary', getConfigsFromDB.sidebarSecondaryConfig, function (req,res) {
	res.render('sbAdmin/editSidebarSecondary.ejs');
});
admin.post('/navigation/sidebarSecondary/', navigationHandler.updateSidebarSecondary);

//Footer
admin.get('/navigation/footer', getConfigsFromDB.footerConfig, function (req,res) {
	res.render('sbAdmin/editFooter.ejs');
});
admin.post('/navigation/footer/', navigationHandler.updateFooter);
admin.post('/navigation/socialMedia/', navigationHandler.updateSocialMedia);

//Social Media
admin.get('/navigation/socialMedia', getConfigsFromDB.socialMediaConfig, function (req,res) {
	res.render('sbAdmin/editSocialMedia.ejs');
});
admin.post('/navigation/socialMedia/', navigationHandler.updateSocialMedia);


//Export admin module
module.exports = admin;