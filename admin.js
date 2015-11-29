var express = require('express'); 
var ejs = require('ejs');

var admin = express(); 

admin.set('view engine', 'ejs');

//This is equivalent to /admin/. All /admin routes are redirected to this route system.
admin.get('/', function (req,res) {
	res.send('hello admin!');
});


module.exports = admin;