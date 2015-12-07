/*****************************************
*    Update tables through ACP           *
******************************************/

/*
  /!\ TODO: All delete functions are inherently similar. The only difference among them is
            the table. Write a function that passes in a table name, builds the string,
            and then deletes based on that table and string. This fucntion will be 
            universal for all tables.
*/


/*****************************************
*    Navbar                              *
******************************************/

var navbarRedirect = '/admin/navigation/navbar';

var addNavbar= function (req,res) {
  var header = req.body.header;
  var dropdown = req.body.dropdown;
  var priority = req.body.priority;

  var addNewEntry = [header,dropdown,priority];    

  req.db.run('INSERT INTO navbar (header,dropdown,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

    res.redirect(navbarRedirect);
  }); // end req.db.run
};

var updateNavbar = function (req,res) {
  //variables from page
  var header = req.body.header;
  var priority = req.body.priority;
  var id = req.body.id;
  var dropdown = req.body.dropdown;


  //Make an array to populate with updateTokens
  var updateTokens = [];

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
    res.redirect(navbarRedirect);
};

var deleteFromNavbarByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM navbar WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    res.redirect(navbarRedirect);
};



/*****************************************
*    Primary Sidebar                     *
******************************************/

var sidebarPrimaryRedirect = '/admin/navigation/sidebarPrimary';

var addSidebarPrimary = function (req,res) {
  var header = req.body.header;
  var links = req.body.links;
  var priority = req.body.priority;

  var addNewEntry = [header,links,priority];    

  req.db.run('INSERT INTO sidebarPrimary (header,links,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

    res.redirect(sidebarPrimaryRedirect);
  }); // end req.db.run
};

var updateSidebarPrimary = function (req,res) {
  var header = req.body.header;
  var links = req.body.links;
  var priority = req.body.priority;
  var id = req.body.id;

  var updateTokens = [];

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

    res.redirect(sidebarPrimaryRedirect);
}; 

var deleteFromSidebarPrimaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarPrimary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    res.redirect(sidebarPrimaryRedirect);
};

/*****************************************
*    Secondary Sidebar                   *
******************************************/

var sidebarSecondaryRedirect = '/admin/navigation/sidebarSecondary';

var addSidebarSecondary = function (req,res) {
  var name = req.body.name;
  var URL = req.body.URL;
  var priority = req.body.priority;

  var addNewEntry = [name,URL,priority];    

  req.db.run('INSERT INTO sidebarSecondary (name,URL,priority) VALUES(?,?,?)', addNewEntry, function (err) {
    if (err) {
      res.send(err);
    }

    res.redirect(sidebarSecondaryRedirect);
  }); // end req.db.run
};


var updateSidebarSecondary = function (req,res) {
  var name = req.body.name;
  var URL = req.body.URL;
  var priority = req.body.priority;
  var id = req.body.id;

  var updateTokens = [];

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

    res.redirect('/admin/navigation/sidebarSecondary');
};

var deleteFromSidebarSecondaryByID = function (req,res) {
  id = req.id;

  req.db.run('DELETE FROM sidebarSecondary WHERE id=?', id, function (err) {
    if(err) {
      res.send(err);
    }
  }); //end req.db.run
    res.redirect(sidebarSecondaryRedirect);
};

/*****************************************
*    Footer                              *
******************************************/

var updateFooter = function (req,res) {
  var header = req.body.header;
  var links = req.body.links;
  var priority = req.body.priority;
  var id = req.body.id;

  var updateTokens = [];

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

    res.redirect('/admin/navigation/footer');
}; //end update footer

/*****************************************
*    Social Media                        *
******************************************/

var updateSocialMedia = function (req,res) {

  var header = req.body.header;
  var description = req.body.description;
  var facebook = req.body.facebookURL;
  var twitter = req.body.twitterURL;
  var youTube = req.body.youTubeURL;  
  var instagram = req.body.instagramURL;  

  var updateToken = [header,description,facebook,twitter,youTube,instagram];

    req.db.run('UPDATE socialMedia SET header=?,description=?,facebookURL=?,twitterURL=?,youTubeURL=?,instagramURL=? WHERE id=1', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
    }); // end req.db.run

    res.redirect('/admin/navigation/socialMedia');
}; //end update footer

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

  updateFooter: updateFooter,
  updateSocialMedia: updateSocialMedia  
}