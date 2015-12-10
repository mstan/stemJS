/*******************************
*        Packages & Deps       *
********************************/
var express = require('express'),
    passport = require('passport'),
    crypto = require('crypto');

    LocalStrategy = require('passport-local').Strategy;


//Personal library
var permissionHandler = require('./lib/permissionHandler.js');

/*******************************
*       variables              *
********************************/



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
*       Passport               *
********************************/
passport.use(new LocalStrategy(
  function (username, password, done) {

    db.get('SELECT * FROM users WHERE email = ?', username, function (err, user) {
      var userPassword = password; //from the password being put in.

      var salt = user.salt,
          hashedDBPassword = user.password,

          iterations = 10,
          hashLength = 64,
          hashType = 'sha256',
          hashedUserKey = crypto.pbkdf2Sync(userPassword, salt, iterations, hashLength, hashType);
          hashedUserPassword = hashedUserKey.toString('hex');



              
      // Database error. Fail out immediately.       
      if (err) {
        return done(err); 
      //That user email does not exist  
      } else if(!user) {
          return done(null, false); 
      //Run password check. Does it work?    
      } else if(hashedUserPassword != hashedDBPassword) {
          return done(null, false); 
      } else {
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




/*******************************
*        Routing - Login       *
********************************/
auth.get('/', permissionHandler.loginCheck, function (req,res) {
  res.render('loginForm/index', {message: "" });
});

auth.post('/', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth'
  }) // end passport.authenticate 
); // end auth.post

/*******************************
*      Routing - Register      *
********************************/

auth.get('/register', permissionHandler.firstCheck, function (req,res) {

  res.render('loginForm/register');
});

auth.post('/register', permissionHandler.firstCheck, function (req,res) {
  var name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      passwordCheck = req.body.passwordCheck;

  var saltBytes = crypto.randomBytes(32), //generate random bytes
      salt = saltBytes.toString('hex'), //Salt (random)
      iterations = 10, //number of iterations
      hashLength = 64, //How long I want this to be
      hashType = 'sha256',
      hashedKey = crypto.pbkdf2Sync(password, salt, iterations, hashLength, hashType);
      hashedPassword = hashedKey.toString('hex');      

  var newUserToken = [name,email,hashedPassword,salt];

  if (password != passwordCheck) {
    auth.locals.msg = 'Passwords do not match';    
    res.render('loginForm/register');
  } else {
    req.db.run('INSERT INTO users (name,email,password,salt) VALUES(?,?,?,?)', newUserToken, function (err,row) {
      if (err) {
        auth.locals.msg = err;
        res.render('loginForm/register');
      } else {
        auth.locals.msg = 'success';
        res.render('loginForm/register');
      }


    }); // end req.db.run
  } // end if-else
});





module.exports = auth;