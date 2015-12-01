/*******************************
*        Packages & Deps       *
********************************/
//Node modules
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');

//Personal lib
var slugHandler = require('./lib/slugHandler.js');
var getConfigsFromDB = require('./lib/getConfigsFromDB.js');

//Admin control panel
var admin = require('./admin.js');

/*******************************
*       Up & Running           *
********************************/
var app = express();

//Database
dbFile = "./db.sqlite";
var db = new sqlite3.Database(dbFile);

/*******************************
*       Middleware             *
********************************/
//Directory Loading
app.use(express.static(__dirname + '/views'));
//Bind the database to the req so it can be accessed elsewhere
app.use(function (req,res,next) {
  req.db = db; 
  next();
});
//Look up the database configuration each time for each
app.use(getConfigsFromDB.globalConfig,
				getConfigsFromDB.navbarConfig, 
				getConfigsFromDB.sidebarPrimaryConfig, 
				getConfigsFromDB.sidebarSecondaryConfig,
				getConfigsFromDB.footerConfig,
				getConfigsFromDB.socialMediaConfig);
//Set view Engine
app.set('view engine', 'ejs');
//Parameter based middleware
app.param('slug', slugHandler.getFromDB);
//Redirect all /admin routes to be handled by route.js
app.use('/admin', admin);

/*******************************
*           Routing            *
********************************/

//Homepage
app.get('/', getConfigsFromDB.indexConfig, function (req,res) {
  res.render('deiform/index');
});

//Page by slug
app.get('/pages/:slug', function (req,res) {
  page = req.page;
  res.render('deiform/one-column.ejs');
});


/*******************************
*       Listen on Port         *
********************************/
app.listen('3000');