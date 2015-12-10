var crypto = require('crypto');


/*******************************
*     Global Vars for Auth     *
********************************/
var iterations = 10, //number of iterations
    hashLength = 64, //How long I want this to be
    hashType = 'sha256';

/*******************************
*     Functions                *
********************************/    

var registerAccount = function (req,res) {
  var name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      passwordCheck = req.body.passwordCheck;

  var saltBytes = crypto.randomBytes(32), //generate random bytes
      salt = saltBytes.toString('hex'), //Salt (random)  
      hashedKey = crypto.pbkdf2Sync(password, salt, iterations, hashLength, hashType);
      hashedPassword = hashedKey.toString('hex');      

  var newUserToken = [name,email,hashedPassword,salt];

  if (password != passwordCheck) {
    auth.locals.msg = 'Passwords do not match';
    auth.locals.status = 0;    
    res.render('loginForm/register');
  } else {
    req.db.run('INSERT INTO users (name,email,password,salt) VALUES(?,?,?,?)', newUserToken, function (err,row) {
      if (err) {
        auth.locals.msg = err;
        res.render('loginForm/register');
      } else {
        auth.locals.msg = 'Success!';
        res.render('loginForm/');
      }


    }); // end req.db.run
  } // end if-else
};

var localStrategy = function (username, password, done) {

    db.get('SELECT * FROM users WHERE email = ?', username, function (err, user) {

      if (!user) {
        return done(null, false);
      } else {

          var userPassword = password; //from the password being put in.

          var salt = user.salt,
              hashedDBPassword = user.password, // already password from the database

              // go ahead and has the user password. We'll compare it to the already hashed one in the db.
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
          // It all checks out. Let's return the user.
              return done(null, {id:user.id, name: user.name, email: user.email}); 
          } 
      } // end if else              
    }); // end db.get
  }; // end function (username, password, done)

var serializeUser = function(user, done) {
  done(null, user);
};

var deserializeUser =  function(user, done) {
  done(null, user);
}

module.exports = {
  registerAccount: registerAccount,
  localStrategy: localStrategy,
  serializeUser: serializeUser,
  deserializeUser: deserializeUser
};