/*****************************************
*    Update tables through ACP           *
******************************************/


var updateNavbar = function (req,res) {
  //variables from page
  var header = req.body.header;
  var dropdown = req.body.dropdown;
  var priority = req.body.priority;
  var id = req.body.id;

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

    res.redirect('/admin/navigation/navbar');
}; //end update footer

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

    res.redirect('/admin/navigation/sidebarPrimary');
}; //end update sidebar primary

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
}; //end update sidebar secondary

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

var updateSocialMedia = function (req,res) {

  var header = req.body.header;
  var description = req.body.description;
  var facebook = req.body.facebookURL;
  var twitter = req.body.twitterURL;
  var youTube = req.body.youTubeURL;  
  var instagram = req.body.instagramURL;  

  var updateToken = [header,description,facebook,twitter,youTube,instagram];

    req.db.run('UPDATE socialMedia SET header=?,description=?,facebookURL=?,twitterURL=?,youTubeURL=?,instagramURL=? WHERE id=1', updateToken, function (err) {
        console.log(err);
    }); // end req.db.run

    res.redirect('/admin/navigation/socialMedia');
}; //end update footer

module.exports = {
  updateNavbar: updateNavbar,
  updateSidebarPrimary: updateSidebarPrimary,
  updateSidebarSecondary: updateSidebarSecondary,
  updateFooter: updateFooter,
  updateSocialMedia: updateSocialMedia  
}