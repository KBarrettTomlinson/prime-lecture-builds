//require
var express = require( 'express' );
var path = require ( 'path' );

//globals
var router = express.Router();

//routes
router.get( '/', function (req, res){
  console.log( "There is a get request to the base whack, we are going to send back index.html");
  res.sendFile( path.resolve( 'server/public/views/index.html') ); //I have a response and that response is a file and this is the file
});//end get index.html

//exports
module.exports = router;
