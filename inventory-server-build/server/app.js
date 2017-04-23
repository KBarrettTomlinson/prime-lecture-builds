//requires
var express = require('express'); //this make express available
var path = require('path'); //this makes path available
var index = require( './modules/index.js');
var inventory = require( './modules/inventory.js');
var bodyParser = require( 'body-parser');// this makes body parser available
//globals
var app = express(); //this sets app equal to the function express()
var port = 5000; // this tells use where to go through which port we are communicating

//uses
app.use( express.static ('server/public')); //tells the client where to look for things where the root directory is
app.use( bodyParser.urlencoded( {extended: true})); //body parser middleware preps requests for posting
app.use( '/', index ); //tells client req for / to go to index
app.use( '/inventory', inventory); //tells client req for /inventory to go to inventory


//gets


//listening
app.listen( port, function(){
  console.log("I'm listening for you on port:", port);
});
