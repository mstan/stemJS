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
admin.get('/', function (req,res) {
	res.render('sbAdmin/index.ejs');
});

admin.get('/pages', slugHandler.listAllPagesBySlug, function (req,res) {
	res.render('sbAdmin/pages.ejs');
});

admin.get('/pages/edit/:slug', function (req,res) {
  page = req.page;
  res.render('sbAdmin/editPage.ejs');
});

admin.get('/blank', slugHandler.listAllPagesBySlug, function (req,res) {
	res.render('sbAdmin/blank.ejs');
});

//Export admin module
module.exports = admin;