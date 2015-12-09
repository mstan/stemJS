/*******************************
*        Packages & Deps       *
********************************/
//Node modules
var express = require('express'),
    ejs = require('ejs'),
    sqlite3 = require('sqlite3'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

/*******************************
*        Database              *
********************************/
dbFile = "./db.sqlite";
var db = new sqlite3.Database(dbFile);

//Personal library
var slugHandler = require('./lib/slugHandler.js'),
    getConfigsFromDB = require('./lib/getConfigsFromDB.js'),
    permissionHandler = require('./lib/permissionHandler.js');


var admin = require('./admin.js'), //Admin Control Panel
    auth = require('./auth.js'); //Authenticator

/*******************************
*       Up & Running           *
********************************/
var app = express();

/*******************************
*       Middleware             *
********************************/
//Sessions and auth
app.use(session({secret: 'secret token', resave: true, saveUninitialized: true})); // Add a token here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('super secret token')); //Add a token here
app.use(passport.initialize());
app.use(passport.session()); 

//Directory Loading
app.use(express.static(__dirname + '/views'));
//Bind the database to the req so it can be accessed elsewhere
app.use(function (req,res,next) {
  req.db = db; 
  next();
});
//Set view Engine
app.set('view engine', 'ejs');
//Parameter based middleware
app.param('slug', slugHandler.getFromDB);
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getConfigsFromDB.globalConfig); //This is called BEFORE /admin and /auth because both make use of our global config
//Redirect all /admin and /auth routes to their respective sub handlers
app.use('/admin', permissionHandler.authCheck, admin)
app.use('/auth', auth);

/* If /admin or /auth are not called, we are rendering an end
	user page. Thus, we must call all of these.  */
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