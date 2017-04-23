//requires
var express = require('express');
var bodyParser = require('body-parser');
var books = require('./routes/books.js');
//globals
var app = express();
var port = 5000;
//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/books',books);
//listens
app.listen(port, function(){
  console.log("I'm listening for you on port:",port);
});//ends listen
