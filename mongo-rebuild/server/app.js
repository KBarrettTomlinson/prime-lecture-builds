//requires modules
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var path = require( 'path' );

//route imports
var employees = require( '.routes/employees.js' );

//mongoose db variables
var mongoose = require( 'mongoose' );
var mongoURI = 'mongodb://localhost:27017/newmarket';   //where is my database
var MongoDB = mongoose.connect(mongoURI).connection;    //??

//globals
var app = express();

//mongoose connect
MongoDB.on( 'error', function( err ){
  console.log( 'Mongo Connection Error:', err);
});//if there is an error connecting, let me know

MongoDB.once( 'open', function(){
  console.log( 'Mongo and I have connected on a deep spiritual level' );
});//once we have successfully connected, let me know

//port

//middleware

//routes

//listen
