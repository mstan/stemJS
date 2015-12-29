/*****************************************
*       First Time Setup Check           *
******************************************/

//Build a setup check to see if the database exists. if it does not, run the table. if it does, skip the table run under firstCheck.

var booleanDBExists = function(req,res,next) {
  req.db.get("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='users'", function (err,row) {

    console.log(row);
  });

    next();
};

var createDB = function (req,res,next) {

  var configTable = 'CREATE TABLE "config" ("id" INTEGER PRIMARY KEY  NOT NULL ,"siteName" VARCHAR NOT NULL ,"siteNavbar" VARCHAR NOT NULL );',
      footerTable = 'CREATE TABLE "footer" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT);',
      indexConfigTable = 'CREATE TABLE "indexConfig" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" VARCHAR NOT NULL  DEFAULT (null) ,"tagline" TEXT NOT NULL  DEFAULT (null) ,"articleHeader" TEXT NOT NULL  DEFAULT (null) ,"articleContent" TEXT NOT NULL  DEFAULT (null) , "orderButton" VARCHAR, "learnMoreButton" VARCHAR);',
      navbarTable = 'CREATE TABLE "navbar" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "dropdown" TEXT);',
      pagesTable = 'CREATE TABLE "pages" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "slug" VARCHAR NOT NULL  UNIQUE , "navbarTitle" VARCHAR NOT NULL , "articleHeader" VARCHAR, "articleContent" TEXT);',
      passwordResetTable = 'CREATE TABLE "passwordReset" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "email" VARCHAR NOT NULL  UNIQUE , "createdAt" VARCHAR, "hasBeenUsed" BOOL NOT NULL  DEFAULT 0, "key" VARCHAR NOT NULL );',
      sidebarPrimaryTable = 'CREATE TABLE "sidebarPrimary" ("id" INTEGER PRIMARY KEY  NOT NULL ,"header" TEXT NOT NULL  DEFAULT (null) ,"priority" INTEGER NOT NULL , "links" TEXT);',
      sidebarSecondaryTable = 'CREATE TABLE "sidebarSecondary" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT , "name" VARCHAR NOT NULL , "URL" TEXT, "priority" INTEGER);',
      headerTable = 'CREATE TABLE "socialMedia" ("header" VARCHAR, "description" TEXT, "facebookURL" VARCHAR, "twitterURL" VARCHAR, "youTubeURL" VARCHAR, "instagramURL" VARCHAR, "id" INTEGER PRIMARY KEY  AUTOINCREMENT  UNIQUE );',
      usersTable = 'CREATE TABLE "users" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "name" VARCHAR, "email" VARCHAR UNIQUE , "password" VARCHAR, "salt" VARCHAR);',

      arrayTables = [configTable, footerTable, indexConfigTable, navbarTable, pagesTable, passwordResetTable, sidebarPrimaryTable, sidebarSecondaryTable, headerTable, usersTable];

  arrayTables.forEach(function (createTableStatement) {

    req.db.run(createTableStatement, function (err) {
      if(err) {
        console.log(err);
      }
    }); // end req.db.run
  }); //end forEach

  next();

}



// Do we have any user accounts in the database?
// If so, don't let another user register.
var firstCheck = function (req,res,next) {
  req.db.get('SELECT * FROM USERS', function (err,row) {
    if(row) {

      res.redirect('/auth');
    } else {
      createDB(req,res,next);
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