/*****************************************
*    Load system configurations from DB  *
******************************************/
/*
  /!\ TODO: Modify this module to instead read from memory on startup and on modification from the ACP. 
            This will be to improve efficiency by loading from memory most of the time, instead of from
            disk.
*/



/*****************************************
*    config: id,siteName,siteNavbar      *
******************************************/
var globalConfig =function (req,res,next) {
  req.db.get('SELECT * FROM config WHERE id = 1', function (err,row) {
    if(row) {
      res.locals.config = row;
      return next();
    } else {
        // /!\ TODO: Modify this module to redirect to new instance setup.
        res.status(404).send('No Config Made Yet!');
    } // end if-else
  }); // end req.db.get
}; //End globalConfig


/*****************************************
*  navbar: id,priority,header,dropdown   *
******************************************/
var navbarConfig = function (req,res,next) {
  req.db.all('SELECT * FROM navbar', function (err,rows) {
      res.locals.navbarEntries = rows
      navbarEntries = res.locals.navbarEntries;

      return next();
  }); // end req.db.all
}; //End navbarConfig

/*****************************************
*sidebarPrimary: id,priority,header,links*
******************************************/

var sidebarPrimaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarPrimary', function (err,rows) {
      res.locals.sidebarPrimarySections = rows;
      sidebarPrimarySections = res.locals.sidebarPrimarySections;

      return next();
  }); // end req.db.all
}; //End sidebarPrimaryConfig

/**********************************************
 sidebarSecondaryConfig: id,priority,name,URL *
***********************************************/
var sidebarSecondaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarSecondary', function (err,rows) {
      res.locals.sidebarSecondarySections= rows;
      sidebarSecondarySections = res.locals.sidebarSecondarySections;

      return next();
  }); // end req.db.all
}; //End sidebarSecondaryConfig

/*****************************************
* footerConfig: id,priority,header,links *
******************************************/

var footerConfig = function (req,res,next) {
  req.db.all('SELECT * FROM footer', function (err,rows) {
      footerSections  = rows;
      return next();
  }); // end req.db.all
}; //End footerConfig

/*************************************************
* socialMediaConfig: header,description,         *
* facebookURL,twitterURL,youTubeURL,instagramURL *
**************************************************/
var socialMediaConfig = function (req,res,next) {
  req.db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
      socialMedia  = row;
      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*********************************************
* indexConfig: header,tagline, articleHeader *
* articleContent,orderButton,LearnMoreButton *
**********************************************/

var indexConfig = function (req,res,next) {
  req.db.get('SELECT * FROM indexConfig WHERE id = 1', function (err,row) {
      res.locals.indexConfig  = row;
      indexConfig = res.locals.indexConfig;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)


/*
  Export all modules
*/
module.exports = {
  globalConfig: globalConfig,
  navbarConfig: navbarConfig,
  sidebarPrimaryConfig: sidebarPrimaryConfig,
  sidebarSecondaryConfig: sidebarSecondaryConfig,
  indexConfig: indexConfig,
  footerConfig: footerConfig,
  socialMediaConfig: socialMediaConfig,
  indexConfig: indexConfig
};