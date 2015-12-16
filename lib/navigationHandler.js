/*****************************************
*    Update tables through ACP           *
******************************************/

/*****************************************
*    Navbar                              *
******************************************/

var navbarRedirect = '/admin/navigation/navbar';

var navbarRouting = function (req,res) {
    navbarMemStatus = 0; // We just updated the navbar. Set memory status to 0. Tell our system to fetch from db next time. 
    res.redirect(navbarRedirect); //Redirect back to the same page. All functions will redirect to the same. Set it here.
};

var addNavbar= function (req,res) {
  var header = req.body.header,
      dropdown = req.body.dropdown,
      priority = req.body.priority,

      addNewEntry = [header,dropdown,priority];    

  req.db.run('INSERT INTO navbar (header,dropdown,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    } else {
      navbarRouting(req,res);
    } // end if-else
  }); // end req.db.run
};

var updateNavbarSingle = function (req,res,next) {
  var header = req.body.header,
      priority = req.body.priority,
      id = req.body.id,
      dropdown = req.body.dropdown,
      //Make an array to populate with updateTokens
      updateToken = [header,dropdown,priority,id];  

      req.db.run('UPDATE navbar SET header=?,dropdown=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run      

      return(next);
};

var updateNavbarArray = function (req,res,next) {
    //variables from page. Each is an array for the id.map function.
    //This way, it won't error out if there is only one entry in the db.
  var header = req.body.header,
      priority = req.body.priority,
      id = req.body.id,
      dropdown = req.body.dropdown,
      //Make an array to populate with updateTokens
      updateTokens = [];

    //Map tokens by ID count
    id.map ( function (value, index) {
      updateTokens[index] = [ header[index], dropdown[index], priority[index], id[index] ];
    });

    //Run a for each of all the tokens. Use this to update each entry in the db
    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE navbar SET header=?,dropdown=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run      
    }); // end updateTokens.forEach  

    return(next);

};

var updateNavbar = function (req,res) {
  var id = req.body.id,
      idLength = parseInt (id.length);

  if( idLength > 1) {
    console.log('greater than 1');
    updateNavbarArray(req,res);
  } else {
    console.log('less than or equal to 1');
    updateNavbarSingle(req,res);
  }

  //Set memory status to zero. Redirect.            
  navbarRouting(req,res);     
};


var deleteFromNavbarByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM navbar WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
  navbarRouting(req,res);     
};



/*****************************************
*    Primary Sidebar                     *
******************************************/

var sidebarPrimaryRedirect = '/admin/navigation/sidebarPrimary';

var sidebarPrimaryRouting = function (req,res) {
  sidebarPrimaryMemStatus = 0;
  res.redirect(sidebarPrimaryRedirect);
};

var addSidebarPrimary = function (req,res) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,

      addNewEntry = [header,links,priority];    

  req.db.run('INSERT INTO sidebarPrimary (header,links,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }
  }); // end req.db.run

  sidebarPrimaryRouting(req,res);  
};

var updateSidebarPrimarySingle = function (req,res,next) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,
      id = req.body.id,

      updateToken = [header,links,priority,id];  

      req.db.run('UPDATE sidebarPrimary SET header=?,links=?,priority=? WHERE id=?', updateToken, function (err) {
        if(err) {
          res.send(err);
        }
      }); // end req.db.run

      return(next);
};

var updateSidebarPrimaryArray = function (req,res,next) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,
      id = req.body.id,

      updateTokens = [];

    id.map ( function (value, index) {
      updateTokens[index] = [ header[index], links[index], priority[index], id[index] ];
    });

    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE sidebarPrimary SET header=?,links=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run
    }); // end updateTokens.forEach

    return(next);  
};

var updateSidebarPrimary = function (req,res) {
  var id = req.body.id,
      idLength = parseInt (id.length);

  if(idLength > 1) {
    updateSidebarPrimaryArray(req,res);
  } else {
    updateSidebarPrimarySingle(req,res);
  }

   sidebarPrimaryRouting(req,res);  
}; 

var deleteFromSidebarPrimaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarPrimary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run

  sidebarPrimaryRouting(req,res);  
};

/*****************************************
*    Secondary Sidebar                   *
******************************************/

var sidebarSecondaryRedirect = '/admin/navigation/sidebarSecondary';

var sidebarSecondaryRouting = function (req,res) {
  sidebarSecondaryMemStatus = 0;
  res.redirect(sidebarSecondaryRedirect);
};

var addSidebarSecondary = function (req,res) {
  var name = req.body.name,
      URL = req.body.URL,
      priority = req.body.priority,

      addNewEntry = [name,URL,priority];    

  req.db.run('INSERT INTO sidebarSecondary (name,URL,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }
  }); // end req.db.run
  sidebarSecondaryRouting(req,res);  
};

var updateSidebarSecondarySingle = function (req,res,next) {
  var name = req.body.name,
      URL = req.body.URL,
      priority = req.body.priority,
      id = req.body.id,

      updateToken = [name,URL,priority,id];  

      req.db.run('UPDATE sidebarSecondary SET name=?,URL=?,priority=? WHERE id=?', updateToken, function (err) {
        if(err) {
          res.send(err);
        }
      }); // end req.db.run

      return(next);
};

var updateSidebarSecondaryArray = function (req,res,next) {
  var name = req.body.name,
      URL = req.body.URL,
      priority = req.body.priority,
      id = req.body.id,

      updateTokens = [];

    id.map ( function (value, index) {
      updateTokens[index] = [ name[index], URL[index], priority[index], id[index] ];
    });

    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE sidebarSecondary SET name=?,URL=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run
    }); // end updateTokens.forEach

    return(next);  
};


var updateSidebarSecondary = function (req,res) {
  var id = req.body.id,
      idLength = parseInt (id.length);

  if(idLength > 1) {
    updateSidebarSecondaryArray(req,res);
  } else {
    updateSidebarSecondarySingle(req,res);   
  }

  sidebarSecondaryRouting(req,res);
};

var deleteFromSidebarSecondaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarSecondary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
  sidebarSecondaryRouting(req,res);
};

/*****************************************
*    Footer                              *
******************************************/

var footerRedirect = '/admin/navigation/footer';

var footerRouting = function (req,res) {
  footerMemStatus = 0;
  res.redirect(footerRedirect);
};

var addFooter = function (req,res) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,

      addNewEntry = [header,links,priority];

  req.db.run('INSERT INTO footer (header,links,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }
  }); // end req.db.run

  footerRouting(req,res);
};

var updateFooterSingle = function(req,res,next) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,
      id = req.body.id,

      updateToken = [header,links,priority,id];  

      req.db.run('UPDATE footer SET header=?,links=?,priority=? WHERE id=?', updateToken, function (err) {
        if(err) {
          res.send(err);
        }
      }); // end req.db.run      

      return(next);
};

var updateFooterArray = function(req,res,next) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,
      id = req.body.id,

      updateTokens = [];

    id.map ( function (value, index) {
      updateTokens[index] = [ header[index], links[index], priority[index], id[index] ];
    });

    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE footer SET header=?,links=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run
    }); // end updateTokens.forEach

    return(next);
};

var updateFooter = function (req,res) {
  var id = req.body.id,
      idLength = parseInt (id.length);

  if(idLength > 1 ) {
    updateFooterArray(req,res);
  } else {
    updateFooterSingle(req,res);
  }

    footerRouting(req,res);
};

var deleteFromFooterByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM footer WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run

  footerRouting(req,res);
};

/*****************************************
*    Social Media                        *
******************************************/

var socialMediaRedirect = '/admin/navigation/socialMedia';

var socialMediaRouting = function (req,res) {
  socialMediaMemStatus = 0;  //Reset memory values back to 0 for db to re-update
  res.redirect(socialMediaRedirect);
};

var socialMediaHandler = function(req,res) {
  db.get('SELECT * FROM socialMedia WHERE id = 1', function (err,row) {
    if(row) {
        updateSocialMedia(req,res);
    } else {
        createSocialMediaIfNotExists(req,res);
    } // end if-else
  }); //end db.get
};

var createSocialMediaIfNotExists = function (req,res) {
  var header = req.body.header,
      description = req.body.description,
      facebook = req.body.facebookURL,
      twitter = req.body.twitterURL,
      youTube = req.body.youTubeURL,
      instagram = req.body.instagramURL,
      id = 1, 

      updateToken = [header,description,facebook,twitter,youTube,instagram,id];

      req.db.run('INSERT INTO socialMedia (header,description,facebookURL,twitterURL,youTubeURL,instagramURL,id) VALUES(?,?,?,?,?,?,?)', updateToken, function (err,row) {
        if(err) {
          res.send(err);
        }
      }); //end req.db.run

      socialMediaRouting(req,res);

};

var updateSocialMedia = function (req,res) {

  var header = req.body.header,
      description = req.body.description,
      facebook = req.body.facebookURL,
      twitter = req.body.twitterURL,
      youTube = req.body.youTubeURL,
      instagram = req.body.instagramURL,

      updateToken = [header,description,facebook,twitter,youTube,instagram];

    req.db.run('UPDATE socialMedia SET header=?,description=?,facebookURL=?,twitterURL=?,youTubeURL=?,instagramURL=? WHERE id=1', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
    }); // end req.db.run

    socialMediaRouting(req,res);
};

module.exports = {
  addNavbar: addNavbar,  
  updateNavbar: updateNavbar,
  deleteFromNavbarByID: deleteFromNavbarByID,

  addSidebarPrimary: addSidebarPrimary,  
  updateSidebarPrimary: updateSidebarPrimary,
  deleteFromSidebarPrimaryByID: deleteFromSidebarPrimaryByID,

  addSidebarSecondary: addSidebarSecondary,
  updateSidebarSecondary: updateSidebarSecondary,
  deleteFromSidebarSecondaryByID: deleteFromSidebarSecondaryByID,

  addFooter: addFooter,
  updateFooter: updateFooter,
  deleteFromFooterByID: deleteFromFooterByID,
  
  socialMediaHandler: socialMediaHandler
}