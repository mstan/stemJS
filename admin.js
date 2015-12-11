/*******************************
*        Packages & Deps       *
********************************/
//Packages
var express = require('express'),
    slugHandler = require('./lib/slugHandler.js');

//lib
var getConfigsFromDB = require('./lib/getConfigsFromDB.js'),
    navigationHandler = require('./lib/navigationHandler.js'),
    authHandler = require('./lib/authHandler.js');
    configHandler = require('./lib/configHandler.js');

/*******************************
*       Up & Running           *
********************************/
var admin = express(); 

/*******************************
*       Middleware             *
********************************/
//Parameter based middleware
admin.param('slug', slugHandler.getFromDB);
admin.param('id', function (req,res,next,id) {
  req.id = id;
  next();
});

/*******************************
*           Routing            *
*  all routes are prefixed with*
*  /admin/                     *
********************************/
//Admin Homepage
admin.get('/', function (req,res) {
  res.render('sbAdmin/index.ejs');
});

admin.post('/globalConfig', configHandler.globalConfigHandler);

  /*******************************
  *        Routing - Pages       *
  ********************************/

//Pull all entries from the database by their slug
admin.get('/pages', slugHandler.listAllPagesBySlug, function (req,res) {
  res.render('sbAdmin/editPages.ejs');
});
admin.get('/pages/edit/:slug', function (req,res) {
  page = req.page;
  res.render('sbAdmin/editPage.ejs');
});
admin.post('/pages/edit', slugHandler.updatePageBySlug);
admin.get('/pages/delete/:slug', slugHandler.deletePageBySlug);

admin.get('/pages/add', function (req,res) {
  res.render('sbAdmin/addPage.ejs');
});
admin.post('/pages/add', slugHandler.addNewPage);


admin.get('/pages/index', getConfigsFromDB.indexConfig, function (req,res) {
  res.render('sbAdmin/editIndex.ejs');
});
admin.post('/pages/index', configHandler.indexHandler);

  /*******************************
  *        Routing - User       *
  ********************************/
admin.get('/account', function (req,res) {
  var user = req.user;
  res.render('sbAdmin/editAccount', {user: user});
});
admin.post('/account/edit', authHandler.updateAccount); 
admin.get('/account/logout', function (req,res) {
  req.logout();
  res.redirect('/auth');
});


  /*******************************
  *     Routing - Navigation     *
  ********************************/

//Header
admin.get('/navigation/navbar', getConfigsFromDB.navbarConfig, function (req,res) {
  res.render('sbAdmin/editNavbar.ejs');
});
admin.post('/navigation/navbar', navigationHandler.updateNavbar);
admin.get('/navigation/navbar/delete/:id', navigationHandler.deleteFromNavbarByID);
admin.post('/navigation/navbar/add', navigationHandler.addNavbar);

//Sidebar Primary
admin.get('/navigation/sidebarPrimary', getConfigsFromDB.sidebarPrimaryConfig, function (req,res) {
  res.render('sbAdmin/editSidebarPrimary.ejs');
});
admin.post('/navigation/sidebarPrimary/', navigationHandler.updateSidebarPrimary);
admin.get('/navigation/sidebarPrimary/delete/:id', navigationHandler.deleteFromSidebarPrimaryByID);
admin.post('/navigation/sidebarPrimary/add', navigationHandler.addSidebarPrimary);

//Sidebar Secondary
admin.get('/navigation/sidebarSecondary', getConfigsFromDB.sidebarSecondaryConfig, function (req,res) {
  res.render('sbAdmin/editSidebarSecondary.ejs');
});
admin.post('/navigation/sidebarSecondary/', navigationHandler.updateSidebarSecondary);
admin.get('/navigation/sidebarSecondary/delete/:id', navigationHandler.deleteFromSidebarSecondaryByID);
admin.post('/navigation/sidebarSecondary/add', navigationHandler.addSidebarSecondary);

//Footer
admin.get('/navigation/footer', getConfigsFromDB.footerConfig, function (req,res) {
  res.render('sbAdmin/editFooter.ejs');
});
admin.post('/navigation/footer/', navigationHandler.updateFooter);
admin.get('/navigation/footer/delete/:id', navigationHandler.deleteFromFooterByID);
admin.post('/navigation/footer/add', navigationHandler.addFooter);

//Social Media
admin.get('/navigation/socialMedia', getConfigsFromDB.socialMediaConfig, function (req,res) {
  res.render('sbAdmin/editSocialMedia.ejs');
});
admin.post('/navigation/socialMedia/', navigationHandler.socialMediaHandler);





//Export admin module
module.exports = admin;