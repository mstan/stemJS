var express = require('express'); 

var auth = express(); 

auth.get('/', function (req,res) {
  res.send('hello world');
});

module.exports = auth;