/*******************************
*        Packages & Deps       *
********************************/
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');

var getContentBySlug = require('./lib/getContentBySlug.js');
var renderPageBySlug = require('./lib/renderPageBySlug.js');

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
//Database
app.use(function (req,res,next) {
  req.db = db; 
  next();
});
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