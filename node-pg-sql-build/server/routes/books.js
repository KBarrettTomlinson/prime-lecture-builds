//requires
var express = require('express');
var pg = require('pg');

//globals
var router = express.Router();
var config = {
  database: 'chi',
  host:'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};//ends var config object
var pool = new pg.Pool(config);

//routes

//gets
  //SELECT * FROM "books"
  router.get('/',function(req, res){
    //pool setup
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query('SELECT *'+
                  'FROM "books"'+
                  'ORDER BY "author" ASC;',
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.send(result.rows);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends SELECT * FROM "books"


//posts
  //INSERT INTO "books"
  router.post('/add',function(req, res){
    //pull apart object
    console.log("you made it into the post for /add");
    var author = req.body.author;
    var title = req.body.title;
    var publisher = req.body.publisher;
    var year = parseInt(req.body.year);
    console.log(author,title,publisher,year);
    //pool set up
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query('INSERT INTO "books" ("author","title","publisher","year")'+
                  'VALUES ($1,$2,$3,$4);',
                  [author,title,publisher,year],
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.sendStatus(201);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends INSERT INTO "books"

//puts
  //UPDATE "books" SET WHERE
  router.put('/edit',function(req, res){
    //pull apart object
    console.log("you made it into the post for /edit");
    var id = req.body.id;
    var author = req.body.author;
    var title = req.body.title;
    var publisher = req.body.publisher;
    var year = parseInt(req.body.year);
    console.log(author,title,publisher,year);
    //pool set up
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query('UPDATE "books"'+
                  'SET "author" = $1, "title" = $2, "publisher" = $3, "year" = $4'+
                  'WHERE "id" = $5;',
                  [author, title, publisher, year, id],
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.sendStatus(201);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends INSERT INTO "books"

//deletes
  //DELETE FROM "books" WHERE "id" = $1
  router.delete('/delete/:valOne',function(req, res){
    var bookId = req.params.valOne;
    console.log("you made it into the delete for /delete", bookId);
    //pool set up
    pool.connect(function(error,db,done){
      if(error){
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      }//ends if
      else{
        db.query('DELETE FROM "books"'+
                  'WHERE "id" = $1;',
                  [bookId],
                  function(queryError,result){
                    done();
                    if(queryError){
                      console.log("Error making query.");
                      res.sendStatus(500);
                    }//ends if
                    else{
                      res.sendStatus(201);
                    }//ends else
                  });//ends db.query
      }//ends else
    });//ends pool.connect
  });//ends DELETE FROM "books" WHERE "id" = $1

//exports
module.exports = router;
