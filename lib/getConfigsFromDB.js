/*****************************************
*    Load system configurations from DB  *
******************************************/


/*****************************************
*    config: id,siteName,siteNavbar      *
******************************************/
// config = {};
configMemStatus = 0;

//If a config doesn't exist yet, make one in memory as a placeholder
var globalConfigPlaceholder = function(req,res,next) {
  config = {siteName: 'A new website',
            siteNavbar: 'stemJS' };
  return next();
};

// Pull config from DB. populate
var pullGlobalConfigFromDB = function(req,res,row,next) {
  if (configMemStatus == 0) {
      config = row;
      configMemStatus = 1;
      return next();
  } else {
      return next();
  } // end if-else (configMemStatus == 0 ) 
};

var globalConfig =function (req,res,next) {
  req.db.get('SELECT * FROM config WHERE id = 1', function (err,row) {

    if(!row) {
      globalConfigPlaceholder(req,res,next);
    } else {
      pullGlobalConfigFromDB(req,res,row,next);
    } // end if-else (!row)
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


var navbarPlaceholder = function(req,res,next) {
  navbarEntries = [{ id: 1,
                    header: 'Home|/',
                    priority: 0,
                    dropdown: ''
                  }];
  return next();
};

// Pull config from DB. populate
var pullNavbarFromDB = function(req,res,rows,next) {
    if (navbarMemStatus == 0) {
      navbarEntries = rows;
      navbarMemStatus = 1;
      return next();
    } else {
      return next();
    } // end if-else
};


var navbarConfig = function (req,res,next) {
  req.db.all('SELECT * FROM navbar ORDER BY priority', function (err,rows) {
      if(!rows) {
        navbarPlaceholder(req,res,next);
      } else {
        pullNavbarFromDB(req,res,rows,next);
      }
  });
};

/*****************************************
*sidebarPrimary: id,priority,header,links*
******************************************/
// sidebarPrimarySections = {};
sidebarPrimaryMemStatus = 0;

var sidebarPrimarySectionsPlaceholder = function(req,res,next) {
  sidebarPrimarySections = [{ id: 1,
                             header: '1379Tech|http://1379.tech',
                             priority: 0,
                             links: ''
                           }];
  return next();
};

// Pull config from DB. populate
var pullsidebarPrimaryFromDB = function(req,res,rows,next) {
    if (sidebarPrimaryMemStatus == 0) {
      sidebarPrimarySections = rows;
      sidebarPrimaryMemStatus = 1;
      return next();

    } else {
      return next();
    } // end if-else
};

var sidebarPrimaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarPrimary ORDER BY priority', function (err,rows) {
    if (!rows) {
      sidebarPrimarySectionsPlaceholder(req,res,next);
    } else {
      pullsidebarPrimaryFromDB(req,res,rows,next);
    }
  }); // end req.db.all
};

/**********************************************
 sidebarSecondaryConfig: id,priority,name,URL *
***********************************************/
//sidebarSecondarySections = {};
sidebarSecondaryMemStatus = 0;

var sidebarSecondarySectionsPlaceholder = function(req,res,next) {
  sidebarSecondarySections = [{ id: 1,
                                name: 'stemJS on Github',
                                priority: 0,
                                URL: 'https://github.com/mstan/stemJS'
                              }];
  return next();
};

// Pull config from DB. populate
var pullsidebarSecondaryFromDB = function(req,res,rows,next) {
    if (sidebarSecondaryMemStatus == 0) {
        sidebarSecondarySections = rows;
        sidebarSecondaryMemStatus = 1;
       return next();
    } else {
        return next();
    } // end if-else
};


var sidebarSecondaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarSecondary ORDER BY priority', function (err,rows) {
    if(!rows) {
      sidebarSecondarySectionsPlaceholder(req,res,next);
    } else {
      pullsidebarSecondaryFromDB(req,res,rows,next);
    }
  }); // end req.db.all
};

/*****************************************
* footerConfig: id,priority,header,links *
******************************************/
//footerSecondarySections = {};
footerMemStatus = 0;

var footerPlaceholder = function(req,res,next) {
  footerSections = [
                     { id: 1, header: 'Footer A', priority: 0, links: ''},
                     { id: 2, header: 'Footer B', priority: 1, links: ''},
                     { id: 3, header: 'Footer C', priority: 2, links: ''},
                     { id: 2, header: 'Footer D', priority: 3, links: ''}
                   ];
  return next();
};

// Pull config from DB. populate
var pullFooterFromDB = function(req,res,rows,next) {
    if (footerMemStatus == 0) {
      footerSections = rows;
      footerMemStatus = 1;
      return next();
    } else {
      return next();
    }
};


var footerConfig = function (req,res,next) {
  req.db.all('SELECT * FROM footer ORDER BY priority', function (err,rows) {
    if(!rows) {
      footerPlaceholder(req,res,next);
    } else {
      pullFooterFromDB(req,res,rows,next);
    }
  });
};

/*************************************************
* socialMediaConfig: header,description,         *
* facebookURL,twitterURL,youTubeURL,instagramURL *
**************************************************/
//socialMedia = {};
socialMediaMemStatus = 0;

var socialMediaPlaceholder = function(req,res,next) {
  socialMedia = { header: 'Social Media',
                  description: 'Social Media links here. If you don\'t have one, leave it blank. It won\'t show up',
                  facebookURL: 'http://facebook.com', 
                  twitterURL: 'http://twitter.com', 
                  youTubeURL: 'http://youTube.com', 
                  instagramURL: 'http://instagram.com'
                };
  return next();
};

var pullSocialMediaFromDB = function(req,res,row,next) {
  if (socialMediaMemStatus == 0 ) {
      socialMedia  = row;
      socialMediaMemStatus = 1;
      return next();
  } else {
      return next();
  } // end if-else (socialMediaMemStatus == 0);
};



var socialMediaConfig = function (req,res,next) {
  req.db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
    if (!row) {
      socialMediaPlaceholder(req,res,next);
    } else {
      pullSocialMediaFromDB(req,res,row,next);
    } // end if-else (!row)
  }); // end req.db.all
};

/*********************************************
* indexConfig: header,tagline, articleHeader *
* articleContent,orderButton,LearnMoreButton *
**********************************************/

indexConfigMemStatus = 0;


var indexConfigPlaceholder = function(req,res,next) {
  res.locals.indexConfig = { id: 1,
                             header: 'A new website!',
                             tagline: 'stemJS: Built for you!',
                             articleHeader: 'Welcome to stemJS',
                             orderButton: '',
                             learnMoreButton: '',
                             articleContent: 'stemJS was developed for small businesses and individuals to allow for easy website creation. \n' + 
                                              'Check out the repository at http://github.com/mstan/stemJS. \n' +
                                               'Want to get started? head over to <a href="/auth">Registration</a> to register your account!'

                            }
  indexConfig = res.locals.indexConfig;
  return next();
};

//??????????????????????????????????
//Rework this index file. Need to be able to load from just indexConfig = row; as a global. Figure out why I have to keep loading through res.locals.indexConfig.
var pullIndexConfigFromDB = function(req,res,row,next) {
  if (indexConfigMemStatus == 0 ) {
      res.locals.indexConfig  = row;
      indexConfig = res.locals.indexConfig;
      indexConfigMemStatus = 1;

      return next();
  } else {
      res.locals.indexConfig = indexConfig;
      return next();
  } // end if-else (socialMediaMemStatus == 0);
};


var indexConfig = function (req,res,next) {
  req.db.get('SELECT * FROM indexConfig WHERE id = 1', function (err,row) {
    if(!row) { // (!row)
      indexConfigPlaceholder(req,res,next);
    } else {
      pullIndexConfigFromDB(req,res,row,next);
    }
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