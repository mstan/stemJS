/*******************************
*        Packages & Deps       *
********************************/
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');

var getContentBySlug = require('./lib/getContentBySlug.js');
var renderPageBySlug = require('./lib/renderPageBySlug.js');
var getConfigsFromDB = require('./lib/getConfigsFromDB.js');

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
app.use('/admin', admin);
//View Engine
app.set('view engine', 'ejs');
//Parameter based middleware
app.param('slug', getContentBySlug);

/*******************************
*           Routing            *
********************************/

//Homepage
app.get('/', getConfigsFromDB.indexConfig, function (req,res) {
  res.render('deiform/index');
});

//Page by slug
app.get('/pages/:slug', renderPageBySlug);


/*******************************
*       Listen on Port         *
********************************/
app.listen('3000');