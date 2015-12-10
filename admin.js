/*******************************
*        Packages & Deps       *
********************************/
//Packages
var express = require('express'),
    slugHandler = require('./lib/slugHandler.js');

//lib
var getConfigsFromDB = require('./lib/getConfigsFromDB.js'),
    navigationHandler = require('./lib/navigationHandler.js');

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
//Index Homepage
admin.get('/', function (req,res) {
  res.render('sbAdmin/index.ejs');
});

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

  /*******************************
  *        Routing - Pages       *
  ********************************/
admin.get('/account', function (req,res) {
  var user = req.user;
  res.render('sbAdmin/editAccount', {user: user});
});
admin.post('/account/edit', function (req,res) {
  var id = req.body.id,
      name = req.body.name,
      email = req.body.email;
      password = req.body.password;
      passwordCheck = req.body.passwordCheck;


      //Run checks on password. Is it empty? ignore it. If it filled. Make sure it's correct (are they the same?). use it if so.
      if (password || passwordCheck == '') {
       //Database case for no password
          var userToken = [id,name, email];

          req.db.run('UPDATE users SET name=?, email=? WHERE id=? ')

      } else {
      //Database case for password        
      }




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
admin.post('/navigation/socialMedia/', navigationHandler.updateSocialMedia);





//Export admin module
module.exports = admin;