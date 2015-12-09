/*******************************
*        Packages & Deps       *
********************************/
var express = require('express'),
    passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


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
*           Routing            *
********************************/
auth.get('/', function (req,res) {
  res.render('loginForm/index', {message: "" });
});

auth.post('/', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth'
  }) // end passport.authenticate 
); // end auth.post


/*******************************
*       Passport               *
********************************/
passport.use(new LocalStrategy(
  function (username, password, done) {

    db.get('SELECT * FROM users WHERE email = ?', username, function (err, user) {
              
      // Database error. Fail out immediately.       
      if (err) {
        return done(err); 
      } else if(!user) {
          return done(null, false); 
      } else if(user.password != password) {
          return done(null, false); 
      } else {
          console.log(user);
          return done(null, {name: user.name, email: user.email}); 
      }               

    }); // end db.get
  } // end function (username, password, done)
)); // end passport.use

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = auth;