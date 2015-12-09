/*****************************************
*    Update tables through ACP           *
******************************************/

/*****************************************
*    Navbar                              *
******************************************/

var navbarRedirect = '/admin/navigation/navbar';

var addNavbar= function (req,res) {
  var header = req.body.header,
      dropdown = req.body.dropdown,
      priority = req.body.priority,

      addNewEntry = [header,dropdown,priority];    

  req.db.run('INSERT INTO navbar (header,dropdown,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

    navbarMemStatus = 0; // We just updated the navbar. Set memory status to 0. Tell our system to fetch from Db next time. 
    res.redirect(navbarRedirect);
  }); // end req.db.run
};

var updateNavbar = function (req,res) {
  //variables from page
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

    navbarMemStatus = 0; // We just updated the navbar. Set memory status to 0. Tell our system to fetch from Db next time.  
    res.redirect(navbarRedirect);
};

var deleteFromNavbarByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM navbar WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    navbarMemStatus = 0;  
    res.redirect(navbarRedirect);
};



/*****************************************
*    Primary Sidebar                     *
******************************************/

var sidebarPrimaryRedirect = '/admin/navigation/sidebarPrimary';

var addSidebarPrimary = function (req,res) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,

      addNewEntry = [header,links,priority];    

  req.db.run('INSERT INTO sidebarPrimary (header,links,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

  sidebarPrimaryMemStatus = 0;
    res.redirect(sidebarPrimaryRedirect);
  }); // end req.db.run
};

var updateSidebarPrimary = function (req,res) {
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

    sidebarPrimaryMemStatus = 0;
    res.redirect(sidebarPrimaryRedirect);
}; 

var deleteFromSidebarPrimaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarPrimary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    sidebarPrimaryMemStatus = 0;
    res.redirect(sidebarPrimaryRedirect);
};

/*****************************************
*    Secondary Sidebar                   *
******************************************/

var sidebarSecondaryRedirect = '/admin/navigation/sidebarSecondary';

var addSidebarSecondary = function (req,res) {
  var name = req.body.name,
      URL = req.body.URL,
      priority = req.body.priority,

      addNewEntry = [name,URL,priority];    

  req.db.run('INSERT INTO sidebarSecondary (name,URL,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }
    sidebarSecondaryMemStatus = 0;
    res.redirect(sidebarSecondaryRedirect);
  }); // end req.db.run
};


var updateSidebarSecondary = function (req,res) {
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
    sidebarSecondaryMemStatus = 0;
    res.redirect(sidebarSecondaryRedirect);
};

var deleteFromSidebarSecondaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarSecondary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    sidebarSecondaryMemStatus = 0;  
    res.redirect(sidebarSecondaryRedirect);
};

/*****************************************
*    Footer                              *
******************************************/

var footerRedirect = '/admin/navigation/footer';

var addFooter = function (req,res) {
  var header = req.body.header,
      links = req.body.links,
      priority = req.body.priority,

      addNewEntry = [header,links,priority];    

  req.db.run('INSERT INTO footer (header,links,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

    footerMemStatus = 0;
    res.redirect(footerRedirect);
  }); // end req.db.run
};

var updateFooter = function (req,res) {
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

    footerMemStatus = 0;
    res.redirect(footerRedirect);
};

var deleteFromFooterByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM footer WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    footerMemStatus = 0; 
    res.redirect(footerRedirect);
};

/*****************************************
*    Social Media                        *
******************************************/

var socialMediaRedirect = '/admin/navigation/socialMedia';

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

    socialMediaMemStatus = 0;
    res.redirect(socialMediaRedirect);
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
  
  updateSocialMedia: updateSocialMedia  
}