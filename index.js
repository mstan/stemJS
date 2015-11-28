/*******************************
*        Packages & Deps       *
********************************/
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');

var getContentBySlug = require('./lib/getContentBySlug.js');
var renderPageBySlug = require('./lib/renderPageBySlug.js');
var getConfigFromDB = require('./lib/getConfigFromDB.js');
var getNavbarFromDB = require('./lib/getNavbarFromDB.js');
var getFooterFromDB = require('./lib/getFooterFromDB.js');
var getSocialMediaFromDB = require('./lib/getSocialMediaFromDB.js');

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
app.use(getConfigFromDB, getNavbarFromDB, getFooterFromDB, getSocialMediaFromDB);
//Look up navbar from the database so it can be passed to build the webpage
//View Engine
app.set('view engine', 'ejs');
//Parameter based middleware
app.param('slug', getContentBySlug);

/*******************************
*           Routing            *
********************************/

//Homepage
app.get('/', function (req,res) {
  res.render('deiform/index');
});

//Page by slug
app.get('/pages/:slug', renderPageBySlug);


/*******************************
*       Listen on Port         *
********************************/
app.listen('3000');