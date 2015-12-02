var updateFooter = function (req,res) {
  //variables from page
  var header = req.body.header;
  var links = req.body.links;
  var priority = req.body.priority;
  var id = req.body.id;

  //make an array to populate with updateTokens
  var updateTokens = [];

    //Map tokens by ID count
    id.map ( function (value, index) {
      updateTokens[index] = [ header[index], links[index], priority[index], id[index] ];
    });

    //Run a for each of all the tokens. Use this to update each entry in the db
    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE footer SET header=?,links=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run
    }); // end updateTokens.forEach

    res.redirect('/admin/navigation/footer');
}; //end update footer

var updateNavbar = function (req,res) {
  //variables from page
  var header = req.body.header;
  var dropdown = req.body.dropdown;
  var priority = req.body.priority;
  var id = req.body.id;

  //make an array to populate with updateTokens
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
  //variables from page
  var header = req.body.header;
  var links = req.body.links;
  var priority = req.body.priority;
  var id = req.body.id;

  //make an array to populate with updateTokens
  var updateTokens = [];

    //Map tokens by ID count
    id.map ( function (value, index) {
      updateTokens[index] = [ header[index], links[index], priority[index], id[index] ];
    });

    //Run a for each of all the tokens. Use this to update each entry in the db
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
  //variables from page
  var name = req.body.name;
  var URL = req.body.URL;
  var priority = req.body.priority;
  var id = req.body.id;

  //make an array to populate with updateTokens
  var updateTokens = [];

    //Map tokens by ID count
    id.map ( function (value, index) {
      updateTokens[index] = [ name[index], URL[index], priority[index], id[index] ];
    });

    //Run a for each of all the tokens. Use this to update each entry in the db
    updateTokens.forEach( function (updateToken) {
        req.db.run('UPDATE sidebarSecondary SET name=?,URL=?,priority=? WHERE id=?', updateToken, function (err) {
          if(err) {
            res.send(err);
          }
        }); // end req.db.run
    }); // end updateTokens.forEach

    res.redirect('/admin/navigation/sidebarSecondary');
}; //end update sidebar secondary



module.exports = {
  updateFooter: updateFooter,
  updateNavbar: updateNavbar,
  updateSidebarPrimary: updateSidebarPrimary,
  updateSidebarSecondary: updateSidebarSecondary
}