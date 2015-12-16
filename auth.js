/*******************************
*        Packages & Deps       *
********************************/
var express = require('express'),
    passport = require('passport');

    LocalStrategy = require('passport-local').Strategy;

//Personal library
var permissionHandler = require('./lib/permissionHandler.js');
var authHandler = require('./lib/authHandler.js');

/*******************************
*       Up & Running           *
********************************/
auth = express();

/*******************************
*       Middleware             *
********************************/
auth.use(function (req,res,next) {
  db = req.db; 
  next();
});

/*******************************
*       nodemailer             *
********************************/





/*******************************
*       Passport               *
********************************/
passport.use(new LocalStrategy(authHandler.localStrategy));
passport.serializeUser(authHandler.serializeUser);
passport.deserializeUser(authHandler.deserializeUser);

/*******************************
*        Routing - Login       *
********************************/
auth.get('/', permissionHandler.loginCheck, function (req,res) {
  res.render('loginForm/index');
});
auth.post('/', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth',
  }) // end passport.authenticate 
); // end auth.post

/*******************************
*      Routing - Register      *
********************************/

auth.get('/register', permissionHandler.firstCheck, function (req,res) {
  res.render('loginForm/register');
});
auth.post('/register', permissionHandler.firstCheck, authHandler.registerAccount);

/*******************************
*      Routing - Reset         *
********************************/
auth.get('/reset', function (req,res) {
	res.render('loginForm/forgotPassword');
});
auth.post('/reset', authHandler.resetPassword);

auth.get('/newPassword', authHandler.newPasswordGET);

auth.post('/newPassword', authHandler.newPasswordPOST);


//Export
module.exports = auth;