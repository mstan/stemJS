var indexHandler = function (req,res) {
  db.get('SELECT * FROM indexConfig WHERE id = 1', function (err,row) {
    if(row) {
        indexUpdate(req,res);
    } else {
        createIndexConfigIfNotExists(req,res);
    } // end if-else
  }); //end db.get
};

var createIndexConfigIfNotExists = function (req,res) {
  var header = req.body.header,
      tagline = req.body.tagline,
      articleHeader = req.body.articleHeader,
      articleContent = req.body.articleContent,
      orderButton = req.body.orderButton,
      learnMoreButton = req.body.learnMoreButton,
      id = 1;

  var indexToken = [header,tagline,articleHeader,articleContent,orderButton,learnMoreButton,id];

      req.db.run('INSERT INTO indexConfig (header,tagline,articleHeader,articleContent,orderButton,learnMoreButton,id) VALUES(?,?,?,?,?,?,?)', indexToken, function (err,row) {
        if(err) {
          res.send(err);
        }
      }); //end req.db.run

      res.redirect('/admin/pages/index');

};


var indexUpdate = function (req,res) {
  var header = req.body.header,
      tagline = req.body.tagline,
      articleHeader = req.body.articleHeader,
      articleContent = req.body.articleContent,
      orderButton = req.body.orderButton,
      learnMoreButton = req.body.learnMoreButton,
      id = req.body.id;

  var indexToken = [header,tagline,articleHeader,articleContent,orderButton,learnMoreButton];

  req.db.run('UPDATE indexConfig SET header=?,tagline=?,articleHeader=?,articleContent=?,orderButton=?,learnMoreButton=? WHERE id=1', indexToken, function (err,row){
    if(err) {
      res.send(err);
    } else {
      res.redirect('/admin/pages/index');
    }
  }); // end req.db.run
}



var globalConfigHandler = function(req,res) {
  db.get('SELECT * FROM config WHERE id = 1', function (err,row) {
    if(row) {
        globalConfigUpdate(req,res);
    } else {
        createGlobalConfigIfNotExists(req,res);
    } // end if-else
  }); //end db.get
};

var createGlobalConfigIfNotExists = function (req,res) {
  var siteName = req.body.siteName,
      siteNavbar = req.body.siteNavbar,
      id = 1,

      siteToken = [siteName,siteNavbar];

      req.db.run('INSERT INTO config (siteName,siteNavbar,id) VALUES(?,?,?)', siteToken, function (err,row) {
        if(err) {
          res.send(err);
        }
      }); //end req.db.run

      res.redirect('/admin');

};

var globalConfigUpdate = function (req,res) {
  var siteName = req.body.siteName,
      siteNavbar = req.body.siteNavbar,

      siteToken = [siteName,siteNavbar];

  req.db.run('UPDATE config SET siteName=?,siteNavbar=? WHERE id=1', siteToken, function (err,row) {

    if (err) {
      res.send(err);
    } else {
      res.redirect('/admin');
    }

  }); // end req.db.run
}

module.exports = {
  indexHandler: indexHandler,
  globalConfigHandler: globalConfigHandler
};
