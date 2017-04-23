//requires
var express = require('express');
var path = require('path');

//globals
var router = express.Router();
var inventoryArray = [];

//gets
router.get('/',function(req,res){
  console.log("I've received your get request at / in response, I will send you an inventoryArray");
  res.send(inventoryArray);

});//end /inventory get

//posts
router.post('/add',function(req,res){
  console.log("Inside inventory/add post");
  inventoryArray.push(req.body);
  res.send(200);
});//end /add post

router.post('/searchByName',function(req,res){
  console.log("You made it all the way to invetory/searchByName post");
  //do search function here, then add response to searchbyNameArray send that back
  var matches = [];
  for (var i = 0; i < inventoryArray.length; i++){
    if (inventoryArray[i].name.includes( req.body.name )){
      matches.push(inventoryArray[i]);
    }//end if statement that builds array of matches
  }//end for loop that builds array of matches
  res.send(matches); //tests the connection
});//end /searchByName post


//exports
module.exports = router;
