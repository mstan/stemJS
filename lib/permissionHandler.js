/*****************************************
*       First Time Setup Check           *
******************************************/

// Do we have any user accounts in the database?
// If so, don't let another user register.
var firstCheck = function (req,res,next) {
  req.db.get('SELECT * FROM USERS', function (err,row) {
    if(row) {
      res.redirect('/auth');
    } else {
      next();
    } // end if-else
  });
};

// Do we have any user accounts? If not, redirect from login to register
var loginCheck = function (req,res,next) {
  req.db.get('SELECT * FROM USERS', function (err,row) {
    if(!row) {
      res.redirect('/auth/register');
    } else {
      next();
    } // end if-else
  });
};


/*****************************************
*       User Logged in Check             *
******************************************/

// Use for the ACP. If the user is not logged in
// Don't let them use the ACP.
var authCheck = function (req,res,next) {
  if (req.user != null) {
    next();
  } else {
    res.redirect('/auth');
  } // end else
};




module.exports = {
  firstCheck: firstCheck,
  loginCheck: loginCheck,
  authCheck: authCheck
};