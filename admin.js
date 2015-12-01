/*******************************
*        Packages & Deps       *
********************************/
var express = require('express'); 
var slugHandler = require('./lib/slugHandler.js');

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


//Export admin module
module.exports = admin;