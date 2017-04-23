$(document).ready(function(){
  console.log("I'm here for you.");

  eventListeners();

});

function eventListeners(){

  $('form').on('submit', function(e){
    e.preventDefault();
    var animal = {};
    animal.animal = $('#animal').val();
    animal.species = $('#species').val();

    // $.ajax({
    //   type: 'POST',
    //   url: '/newProduct',
    //   data: product,
    //   success: function(response) {
    //     console.log("SUCCESS!!!");
    //     refreshProducts();
    //   }

    $.ajax({
      type: 'POST',
      url: '/animals',
      data: animal,
      success: function(response){
          console.log("I have received your animal");
          refreshAnimals();
      }
    });

  });
}

function refreshAnimals(){
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function(response){
      console.log(response, "animals array of objects from server");
      displayAnimals(response);
    }
  });
}

function displayAnimals(animals){

  $('.display-data').empty();
  for(var i = 0; i < animals.length; i++){
    $('.display-data').append('<span>'+animals[i].animal+": "+animals[i].species+'</span><br>');
  }

}
