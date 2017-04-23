$(document).ready(function(){
  console.log("I'm here for you.");

  //calls an initial refreshGetData in order to populate the form
  //before any button is clicked
  refreshGetData();

  //writes an on click which takes in new information, uses ajax to send it to app.js
  //then calls refreshGetData in order to get data back and post in the div
  $('form').on("submit",function(event){
    //prevents the page from refreshing
    event.preventDefault();
    //retrieves data from form
    var animal = {};
    animal.animal = $('#animal').val();
    animal.species = $('#species').val();
    //posts data to app.js
    $.ajax({
      type: 'POST',
      url: '/newAnimal',
      data: animal,
      success: function(res){
          console.log("the server has successfully responded after a post");
          refreshGetData();
      }//ends success
    });//ends POST
  });//ends on-submit
});//ends document ready


// refreshGetData uses ajax to get data array of objects
function refreshGetData(){
  console.log("you are inside refreshGetData");
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function(res){
      console.log("the server has successfully responded after a get");
      displayAnimalsArray(res);
    }//ends success
  });//ends GET
}//ends refreshGetData


// display data, appends data to the DOM
function displayAnimalsArray(array){
  //empty the div
  $('#animalsTable').empty();
  console.log("you are inside displayAnimalsArray");
  //iterate through the array of objects
  for ( i = 0; i < array.length; i++){
    $('#animalsTable').append('<span>'+array[i].animal+': '+array[i].species+'</span>');
  }//ends for loop
}//ends displayAnimalsArray
