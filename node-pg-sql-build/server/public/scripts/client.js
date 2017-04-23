//globals
var editing = false;
var bookID = 0;
var dataObject = {};
//document ready
$(document).ready(function(){
  console.log("We are here for you. There are more of us now.");
  selectBooks();
  eventListeners();
});//ends document ready


////COULD CREATE GET OBJECT FUNCTIONS

//function arranged alphabetically
function clickDelete(book){
  console.log("inside delete book");
  console.log("book id to delete",book);
  $.ajax({
    type: 'DELETE',
    url: '/books/delete/'+book,
    success: function(response){
      console.log(response);
      selectBooks();
    }//ends success
  });//end ajax books/delete
}//end deleteBook

function editFormSet(object){
  editing = true;
  $('#formTitle').text("Correcting a title");
  console.log(object);
  $('#author').val(object.author);
  $('#title').val(object.title);
  $('#publisher').val(object.publisher);
  $('#year').val(object.year);
}//end editFormSet

function eventListeners(){
  console.log("inside event listeners");
  //onsubmit
  $('#booksForm').on('submit',function(event){
    event.preventDefault();
    console.log("I WILL SUBMIT");
    var $this = $(this);
    if (editing === true){
      $('#formTitle').text("Loan A Book To Our Libray");
      editing = false;
      submitEdit();
    }//ends if
    else{
      submitAdd();
    }//ends else
  });//ends onsubmit

  //onclick takebook
  $('#booksDisplayDiv').on('click','.delete',function(){
    console.log("I WILL GIVE IT ALL AWAY");
    var $this = $(this);
    var book = $this.data('book');
    console.log(book,'book');
    clickDelete(book);
  });//ends onclick delete class

  //onclick um,Actually
  $('#booksDisplayDiv').on('click','.edit',function(){
    console.log("Just your friendly correction machine");
    var $this = $(this);
    console.log("this is this",$this);
    dataObject.id = $this.data('book');
    dataObject.author = $this.data('author');
    dataObject.title = $this.data('title');
    dataObject.publisher = $this.data('publisher');
    dataObject.year = $this.data('year');
    editFormSet(dataObject);
  });//ends onclick edit class
}//ends eventListeners

function refreshBooksDisplay(arrayOfObjects){
  console.log("We are going to display all of your books!");
  $('#booksDisplayDiv').empty();
  for (var i = 0; i < arrayOfObjects.length; i++){
    // picks upart each object
    var bookObject = arrayOfObjects[i];
    var id = bookObject.id;
    var author = bookObject.author;
    var title = bookObject.title;
    var publisher = bookObject.publisher;
    var year = bookObject.year;
    var $el = $('#booksDisplayDiv').children().last();
    //massages the output to not show null on columns where null is an option
    if (publisher === null) { publisher = ''; }
    if (year === null) { year = ''; }
    //appends the book to a table inside booksDisplay
    $('#booksDisplayDiv').append('<tr></tr>');
    $el.append('<td>'+author+'</td>');
    $el.append('<td>'+title+'</td>');
    $el.append('<td>'+publisher+'</td>');
    $el.append('<td>'+year+'</td>');
    $el.append('<td><button class="delete" data-book="'+id+'">Take Book</button></td>');
    $el.append('<td><button class="edit"'+
                 'data-book="'+id+'"'+
                 'data-author="'+author+'"'+
                 'data-title="'+title+'"'+
                 'data-publisher="'+publisher+'"'+
                 'data-year="'+year+'"'+
                 '>UM, Actually</button>');
  }//ends for loop
  $('#author').val('');
  $('#title').val('');
  $('#publisher').val('');
  $('#year').val('');
  dataObject = {};
}//ends refreshBooksDisplay

function selectBooks(){
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function(response){
      console.log("We've returned from the server side, and I have a response");
      console.log(response);
      refreshBooksDisplay(response);
    }//ends success
  });//ends ajax GET
}//ends selectBooks

function submitAdd(){
  dataObject.author = $('#author').val();
  dataObject.title = $('#title').val();
  dataObject.publisher = $('#publisher').val();
  dataObject.year = $('#year').val();
  console.log(dataObject);
  $.ajax({
    type: 'POST',
    url: '/books/add',
    data: dataObject,
    success: function(response){
      console.log(response);
      selectBooks();
    }//ends success
  });
//ends ajax
}//ends submitAdd

function submitEdit(){
dataObject.author = $('#author').val();
dataObject.title = $('#title').val();
dataObject.publisher = $('#publisher').val();
dataObject.year = $('#year').val();
console.log(dataObject);
$.ajax({
  type: 'PUT',
  url: '/books/edit',
  data: dataObject,
  success: function(response){
    console.log(response);
    selectBooks();
  }//ends success
});
//ends ajax
}//ends submitEdit
