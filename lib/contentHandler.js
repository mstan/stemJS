/*******************************
*     Images                   *
********************************/
var multer = require('multer'),
		crypto = require('crypto'),
		mime = require('mime');

//Multer settings
var storageMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './views/content/images/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(6, function (err, raw) {
      cb(null, Date.now() + raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});


//POST
var uploadImagePOST = function (req,res,cb) {
  console.log(req.file.filename);
  auth.locals.status = 1;
  auth.locals.msg = 'Your image is available at /content/images/' + req.file.filename;
  res.render('sbAdmin/uploadFiles');
};

module.exports = {
	storageMulter: storageMulter,
	uploadImagePOST: uploadImagePOST
};