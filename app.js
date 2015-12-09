/*******************************
*        Packages & Deps       *
********************************/
//Node modules
var express = require('express');
var ejs = require('ejs');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

/*******************************
*        Database      *
********************************/
dbFile = "./db.sqlite";
var db = new sqlite3.Database(dbFile);

//Personal lib
var slugHandler = require('./lib/slugHandler.js');
var getConfigsFromDB = require('./lib/getConfigsFromDB.js');

//Admin control panel
var admin = require('./admin.js');
//authentication
var auth = require('./auth.js');

/*******************************
*       Up & Running           *
********************************/
var app = express();



/*******************************
*       Middleware             *
********************************/
app.use(session({secret: 'secret token', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('super secret token'));
app.use(passport.initialize());
app.use(passport.session()); 

//Directory Loading
app.use(express.static(__dirname + '/views'));
//Bind the database to the req so it can be accessed elsewhere
app.use(function (req,res,next) {
  req.db = db; 
  next();
});
//test application
app.use(function (req,res,next) {
	user = req.user || null;
	console.log('Your user is:');
	console.log(user);
	next();
});
//Set view Engine
app.set('view engine', 'ejs');
//Parameter based middleware
app.param('slug', slugHandler.getFromDB);
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
//Global config - This is called before /admin because it is also used in admin
app.use(getConfigsFromDB.globalConfig);
//Redirect all /admin routes to be handled by route.js
app.use('/admin', admin);
//Redirect all /admin routes to be handled by route.js
app.use('/auth', auth);
//Look up the database configuration each time for each for user pages. This called after /admin
//because admin does not need these and these are not called if redirected to admin
app.use(getConfigsFromDB.navbarConfig, 
				getConfigsFromDB.sidebarPrimaryConfig, 
				getConfigsFromDB.sidebarSecondaryConfig,
				getConfigsFromDB.footerConfig,
				getConfigsFromDB.socialMediaConfig);

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