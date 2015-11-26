/*****************************************
       Load system config
******************************************/

module.exports = function (req,res,next) {
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
