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
// config = {};
configMemStatus = 0;

var globalConfig =function (req,res,next) {
  req.db.get('SELECT * FROM config WHERE id = 1', function (err,row) {

    if (configMemStatus == 0) {
      config = row;
      configMemStatus = 1;
      return next();      
    } else {
      return next();
    } // end if-else

  }); // end req.db.get
};


/*****************************************
*  navbar: id,priority,header,dropdown   *
******************************************/
// navbarEntries = {}; // Not declared. Put into global scope

// navbarMemStatus. Initialize to 0 on start.
    //If 0, we need to run a function to populate
    //If 1, do nothing.
navbarMemStatus = 0;

var navbarConfig = function (req,res,next) {
  req.db.all('SELECT * FROM navbar ORDER BY priority', function (err,rows) {

    if (navbarMemStatus == 0) {
      navbarEntries = rows;
      navbarMemStatus = 1;
      return next();

    } else {
      return next();
    } // end if-else
  }); // end req.db.all
};

/*****************************************
*sidebarPrimary: id,priority,header,links*
******************************************/
// sidebarPrimarySections = {};
sidebarPrimaryMemStatus = 0;

var sidebarPrimaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarPrimary ORDER BY priority', function (err,rows) {

    if (sidebarPrimaryMemStatus == 0) {
      sidebarPrimarySections = rows;
      sidebarPrimaryMemStatus = 1;
      return next();

    } else {
      return next();
    } // end if-else

  }); // end req.db.all
};

/**********************************************
 sidebarSecondaryConfig: id,priority,name,URL *
***********************************************/
//sidebarSecondarySections = {};
sidebarSecondaryMemStatus = 0;

var sidebarSecondaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarSecondary ORDER BY priority', function (err,rows) {
    if (sidebarSecondaryMemStatus == 0) {
      sidebarSecondarySections = rows;
      sidebarSecondaryMemStatus = 1;
      return next();

    } else {
      return next();
    } // end if-else


  }); // end req.db.all
};

/*****************************************
* footerConfig: id,priority,header,links *
******************************************/
//footerSecondarySections = {};
footerMemStatus = 0;

var footerConfig = function (req,res,next) {
  req.db.all('SELECT * FROM footer ORDER BY priority', function (err,rows) {
    if (footerMemStatus == 0) {
      footerSections = rows;
      footerMemStatus = 1;
      return next();
    } else {
      return next();
    }
  }); // end req.db.all
};

/*************************************************
* socialMediaConfig: header,description,         *
* facebookURL,twitterURL,youTubeURL,instagramURL *
**************************************************/
//socialMedia = {};
socialMediaMemStatus = 0;


var socialMediaConfig = function (req,res,next) {
  req.db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
    if (socialMediaMemStatus == 0 ) {
      socialMedia  = row;
      socialMediaMemStatus = 1;
      return next();
    } else {
      return next();
    }

  }); // end req.db.all
};

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
};


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