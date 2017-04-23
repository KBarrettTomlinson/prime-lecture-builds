var express = require('express');
var app = express();

var port = 5000;

var animals =[];

var bodyParser = require('body-parser');

app.use(express.static('server/public',{
  index: 'views/index.html'
}));

app.get("/animals", function(req, res){
  res.send(animals);
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/animals", function(req, res){
  var newAnimal = req.body;
  animals.push(newAnimal);
  res.sendStatus(200);
});


app.listen(port);
console.log("I'm listening on for you on port:",port);
