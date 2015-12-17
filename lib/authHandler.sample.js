var crypto = require('crypto'),
    nodemailer = require('nodemailer');


/*******************************
*     Global Vars for Auth     *
********************************/
var iterations = 10, 
    hashLength = 64,
    hashType = 'sha256';


/*******************************
*Global Vars for Password Reset*
********************************/    

var transporter = nodemailer.createTransport();

var resetPasswordHandler = function (req,res,next) {
  var email = req.body.email,
      createdAt = new Date().getTime() / 1000,
      randomKey = crypto.randomBytes(32), //generate random bytes
      randomKeyHex = randomKey.toString('hex'), //Key to store 

      resetTokenNew = [email,createdAt,randomKeyHex],
      resetTokenUpdate = [createdAt,randomKeyHex,false,email], //false is for hasBeenUsed. Set this to false on a new update so it can be used.

      mailToken = {
                    from: 'noreply@1379.tech',
                    to: email,
                    subject: 'Your Reset Token',
                    text: 'http://<YOURWEBSITE>.<EXT>/auth/newPassword?key= ' + randomKeyHex             
                  }

      //Pull the row. Does it exist?
      req.db.get('SELECT * FROM passwordReset WHERE email = ?', email, function (err,row) {
          //No it does not. Make it
          if(!row) {
            req.db.run('INSERT INTO passwordReset (email,createdAt,key) VALUES(?,?,?)', resetTokenNew, function (err) {
              transporter.sendMail(mailToken); // end transporter.sendMail  
            }); // end req.db.run INSERT
          } else {
            //Yes it does. update it.
            req.db.run('UPDATE passwordReset SET createdAt=?,key=?,hasBeenUsed=? WHERE email = ?', resetTokenNew, function (err) {
              transporter.sendMail(mailToken); // end transporter.sendMail 
            }); // end req.db.run passwordRest
          } // end if-else row
       }); // end req.db.get passwordReset

       return(next);
};



var resetPassword = function (req,res) {
  var email = req.body.email;

  req.db.get('SELECT id FROM users WHERE email = ?', email, function (err,row) {
    if(err) {
        res.send(err);
    } else if(!row) {
       res.send('Email not found!');
    } else {

      resetPasswordHandler(req,res);
      res.redirect('/auth/reset');

    } // end if-else
  }); //end req.db.get FROM users
}; // end resetPassword

var newPasswordGET = function (req,res) {
  key = req.query.key;
  console.log(key);

  req.db.get('SELECT * FROM passwordReset WHERE key=?', key, function (err,row) {

    if(!row) {
      res.send('That doesnt exist!')
    } else {
      var email = row.email;
      res.render('loginForm/newPassword', {email:email});     
    }
  }); // end req.db.get
};


var updatePasswordinDB = function (req,res) {
  var email = req.body.email;
      password = req.body.password,

      saltBytes = crypto.randomBytes(32), //generate random bytes
      salt = saltBytes.toString('hex'), //Salt (random)  
      hashedKey = crypto.pbkdf2Sync(password, salt, iterations, hashLength, hashType),
      hashedPassword = hashedKey.toString('hex'),  

      updatePasswordToken = [hashedPassword,salt,email];

  req.db.run('UPDATE users SET password=?, salt=? WHERE email=?', updatePasswordToken, function (err) {
    if(err) {
      res.send(err);
    } else {
      req.db.run('UPDATE passwordReset SET hasBeenUsed=1 WHERE email=?', email, function (err){});
      auth.locals.status = 1;
      auth.locals.msg = 'Password Changed!';
    } // if-else
  }); //end req.db.run

};

var newPasswordPOST =function (req,res) {
  var email = req.body.email;

      req.db.get('SELECT * FROM passwordReset WHERE email=?', email, function (err,row) {
        var hasBeenUsed = row.hasBeenUsed;
        var createdAt = row.createdAt,
        currentTime = new Date().getTime() / 1000;      


        if(hasBeenUsed || createdAt + 1800 < currentTime) { //1800 seconds represents half an hour. Has it been longer than half an hour since this was created?
          res.send('This token is expired!');
        } else {
          updatePasswordinDB (req,res);
        }

      }); //  end req.db.get
};
  

/*******************************
*     Functions                *
********************************/

var createNewUser = function (req,res) {
  var name = req.body.name,
      email = req.body.email,
      password = req.body.password;

  var saltBytes = crypto.randomBytes(32), //generate random bytes
      salt = saltBytes.toString('hex'), //Salt (random)
      hashedKey = crypto.pbkdf2Sync(password, salt, iterations, hashLength, hashType),
      hashedPassword = hashedKey.toString('hex');

  var newUserToken = [name,email,hashedPassword,salt];


    req.db.run('INSERT INTO users (name,email,password,salt) VALUES(?,?,?,?)', newUserToken, function (err,row) {
      if (err) { //If there's an error adding to the database
        auth.locals.status = -1;
        auth.locals.msg = err;
        res.render('loginForm/register');
      } else { // no error
        auth.locals.status = 1;
        auth.locals.msg = 'New account created successfully!';
        res.render('loginForm/');
      }
    }); // end req.db.run
};


var registerAccount = function (req,res) {
  var password = req.body.password,
      passwordCheck = req.body.passwordCheck;

  if (password != passwordCheck) { // The password and confirm password forms do not match 
    auth.locals.status = -1;
    auth.locals.msg = 'Passwords do not match!';
    res.render('loginForm/register');
  } else { // they do match
    createNewUser(req,res);
  } // end if-else
};

var updateAccount = function (req,res) {
  var accountRoute = '/admin/account';

  var id = req.body.id,
      name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      passwordCheck = req.body.passwordCheck;

      if (passwordCheck == '') { //password field is null. Don't update it.
          var userToken = [name,email,id];

          req.db.run('UPDATE users SET name=?,email=? WHERE id=?', userToken, function (err,row) {
            res.redirect(accountRoute);

          });        
      } else if (password != passwordCheck) { //The password fields do not match. Don't accept it.
          res.redirect(accountRoute);
      } else {

          var saltBytes = crypto.randomBytes(32), //generate random bytes
              salt = saltBytes.toString('hex'), //Salt (random)  
              hashedKey = crypto.pbkdf2Sync(password, salt, iterations, hashLength, hashType),
              hashedPassword = hashedKey.toString('hex');      

          var userToken = [name,email,hashedPassword,salt,id];

          req.db.run('UPDATE users SET name=?,email=?,password=?,salt=? WHERE id=?', userToken, function (err,row){
              if(err) {
                res.send(err);
              } else {
                res.redirect(accountRoute);
              }
          });
      } // end if else
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
          //Run password check. Do they match?    
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
  resetPassword: resetPassword,
  newPasswordGET: newPasswordGET,
  newPasswordPOST: newPasswordPOST,
  updateAccount: updateAccount,
  localStrategy: localStrategy,
  serializeUser: serializeUser,
  deserializeUser: deserializeUser
};