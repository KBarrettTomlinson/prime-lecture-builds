//requirements and globals
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var animals = [];

//use
app.use(express.static('server/public',{
  index: 'views/index.html'
}));
app.use(bodyParser.urlencoded({extended: true}));


//get

// Route GET requests to /products through this function
app.get('/animals', function(req, res){
  res.send(animals);
});


//post

//
app.post('/newAnimal', function(req, res){
  var newAnimal = req.body;
  animals.push(newAnimal);
  console.log(newAnimal);
  res.sendStatus(200);
});


//listen
app.listen(port);
console.log("I'm listening for you on port:",port);
