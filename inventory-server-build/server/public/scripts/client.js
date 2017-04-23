$(document).ready(function(){
  console.log("I'm here for you, finally.");

  refreshInventory();
  eventListeners();

});//end document ready

function eventListeners(){

  //listen to #addItemButton
  $( '#addItemButton' ).on( 'click', function(){
    console.log("CONGRATS! you clicked the addItemButton");
    var newInventoryObject = {
      name: $( '#nameInAdd').val(),
      description: $( '#descriptionInAdd' ).val()
    };
    addItem(newInventoryObject);
  });//end #addItemButton on click

  //listen to #searchByNameButton
  $( '#searchByNameButton' ).on( 'click', function(){
    console.log("CONGRATS! you clicked the searchByNameButton");
    var searchNameObject = {
      name: $( '#nameInSearch').val()
    };
    console.log("This is the object you are looking for:", searchNameObject);
    searchName(searchNameObject);
  });//end #searchByNameButton on click

  //listen to #searchByDescriptionButton
  $( '#searchByDescriptionButton' ).on( 'click', function(){
    console.log("CONGRATS! you clicked the searchByDescriptionButton");
  });//end #searchByDescriptionButton on click

  //listen to #clearSearchButton
  $( '#clearSearchButton' ).on( 'click', function(){
    console.log("CONGRATS! you clicked the clearSearchButton");
    refreshInventory();
  });//end #clearSearchButton on click

}//end eventListeners

function addItem(object){
  //ajax post
  $.ajax({
    type: 'POST',
    url: '/inventory/add',
    data: object,
    success: function(response){
      console.log(response);
      if (response === 'OK'){
        refreshInventory();
      }else{
        alert('Error Adding Item');
      }
    }//end success
  });//end post request
}//end addItem

function displayInventory(array){
  console.log("inside displayInventory");
  $('#outputDiv').empty(); //cleans everything out
  for ( var i = 0; i < array.length; i++){
    $('#outputDiv').append('<span>Name: '+
      array[i].name+'<br>Description: '+array[i].description+'</span>');
    $('#outputDiv').append('<br><br>');
  }//end for loop
}//end displayInventory

function refreshInventory(){
  $.ajax({
    type: 'GET',
    url: '/inventory',
    success: function(response){
      console.log("I'm back from /inventory with a response", response);
      displayInventory(response);
    }
  });//end get request
}//end refreshInventory

function searchName(object){
  $.ajax({
    type: 'POST',
    url: '/inventory/searchByName',
    data: object,
    success: function(response){
      console.log("I've returned from /search/name and I have some thoughts", response);
      displayInventory(response); //This will work if response is an array
    }
  });//end post request
}//end searchName
