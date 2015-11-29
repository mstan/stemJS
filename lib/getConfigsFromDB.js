/*****************************************
*    Load system configurations from DB  *
******************************************/
/*
  /!\ TODO: Modify this module to instead read from memory on startup and on modification from the ACP. 
            This will be to improve efficiency by loading from memory most of the time, instead of from
            disk.
*/


/*
  This module pulls the global config token.

  This object contains the folowing key values: siteName,siteNavbar

  siteName - To be used where the site name should appear. Examples: Top-left home navigation bar menu; Site copyright

  siteNavbar - What is to be used at the top in the browser tab for the website name
*/
var globalConfig =function (req,res,next) {
// 1) Look it up. Does it exist?
  req.db.get('SELECT * FROM config WHERE id = 1', function (err,row) {
// 2a) It exists
    if(row) {
      res.locals.config = row;
      return next();
    } else {
// 2b) It didn't exist      
        res.status(404).send('No Config Made Yet!');
    } // end if-else
  }); // end req.db.get
}; //End function(req,res,next)

/*
  This module pulls ALL entries from the navbar table with each being an object.

  Each object contains the following: id,header,dropdown,priority

  id - ID of the entry. Autogenerate, auto increment. 

  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).
  
  header - Name & URL of the entry. Format is NAME|URL. When being passed to the navbar.ejs, the entries are handled by being split at the |.

  dropdown - Name & URL of all drop-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL. When passed to Navbar EJS, the entries
             are handled by splitting each NAME|URL by ;, then each individual split is handled by splitting at the |, as it is with header

             If dropdown is left null, the rendering section for it is skipped.
*/
var navbarConfig = function (req,res,next) {
  req.db.all('SELECT * FROM navbar', function (err,rows) {
      res.locals.navbarEntries = rows
      navbarEntries = res.locals.navbarEntries;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*
  This module pulls ALL entries from the sidebarPrimary table with each being an object.

  Each object contains the following: id,header,links,priority

  id - ID of the entry. Autogenerate, auto increment. 

  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).
  
  header - Name & URL of the entry. Format is NAME|URL. When being passed to the navbar.ejs, the entries are handled by being split at the |.

  links - Name & URL of all sub-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL. When passed to sidebar EJS, the entries
          are handled by splitting each NAME|URL by ;, then each individual split is handled by splitting at the |, as it is with header

             If links is left null, the rendering section for it is skipped.
*/
var sidebarPrimaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarPrimary', function (err,rows) {
      res.locals.sidebarPrimarySections = rows;
      sidebarPrimarySections = res.locals.sidebarPrimarySections;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*
  This module pulls ALL entries from the sidebarSecondary table with each being an object.

  Each object contains the following: id,name,URL,priority

  id - ID of the entry. Autogenerate, auto increment. 

  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).
  
  name - Name of the link.

  URL - URL of the link

  If sidebarSecondary is entirely null, the entire sidebar section is not rendered.
*/
var sidebarSecondaryConfig = function (req,res,next) {
  req.db.all('SELECT * FROM sidebarSecondary', function (err,rows) {
      res.locals.sidebarSecondarySections= rows;
      sidebarSecondarySections = res.locals.sidebarSecondarySections;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*
  This module pulls ALL entries from the footer table with each being an object.

  Each object contains the following: id,header,links,priority

  id - ID of the entry. Autogenerate, auto increment. 

  priority - Where the entry should appear in the list. Lowest number comes first (leftmost).
  
  header - Name & URL of the entry. Format is NAME|URL. When being passed to the footer.ejs, the entries are handled by being split at the |.

  links - Name & URL of all drop-down entries in a list. Format is NAME|URL;NAME|URL;...NAME|URL. When passed to Footer EJS, the entries
          are handled by splitting each NAME|URL by ;, then each individual split is handled by splitting at the |, as it is with header
*/
var footerConfig = function (req,res,next) {
  req.db.all('SELECT * FROM footer', function (err,rows) {
      res.locals.footerSections  = rows;
      footerSections = res.locals.footerSections;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*
  This module pulls the socialMedia table and passes it off as a token.

  This object contains the folowing key values: header,description,facebookURL,twitterURL,youTubeURL,instagramURL

  This section exists at the end of the footer.

  header - Header of the section. Text only. No hyperlinking

  description - Descriptor below the Header. Text only, no hyperlinking

  facebookURL,twitterURL,youTubeURL,instagramURL - the URL to the corresponding social media site. If left null, the icon is not rendered

*/
var socialMediaConfig = function (req,res,next) {
  req.db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
      res.locals.socialMedia  = row;
      socialMedia = res.locals.socialMedia;

      return next();
  }); // end req.db.all
}; //End function(req,res,next)

/*
  This module pulls the configuration for the index page. This is only pulled when the '/' route is rendered.

  This object contains the folowing key values: header,tagline,articleHeader,articleContent,orderButton,learnMoreButton

  header - Header for the index jumbotron

  tagline - Tagline below the header in the jumbotron

  articleHeader - Header for the base article

  articleContent - Content for the base article

  orderButton & learnMoreButton - URLs for corresponding buttons. If EITHER are left empty, NEITHER are rendered.
*/
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