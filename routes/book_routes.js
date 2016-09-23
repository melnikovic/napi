var express = require('express');

// We are creating the 'book_routes.js' as a function because if we want to test it, we can inject our models on our function
var routes = function(Book) {
  var bookRouter = express.Router();
  var bookController = require('../controllers/book_controller')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);


  // MIDDLEWARE (get the book by id before put/patch/delete)
  bookRouter.use('/:bookId', function(req, res, next) {
    var bookId = req.params.bookId; // example: 56c9d11d3b6c8e7e9977b55d
    Book.findById(bookId, function (err, book) {
      if(err) {
        res.status(500).send(err);
      } else if(book) {
        // If this book exists on database, put it on the request and pass it to the next '/:bookId' function(get/put/patch/delete..)
        req.book = book;
        next();
      } else {
        // Prevent from the next functions to continue if no book was found
        // by doing so, those functions will not need to treat the 'book not found' error
        res.status(404).send("No book of id '" + bookId + "' was found.");
      }
    });
  });

  bookRouter.route('/:bookId')

    // > show
    .get(function(req, res) {
      // Since we already got the 'book' from database across the "bookRouter.use('/:bookId')" middleware
      // We just have to send it to the response and don't have to treat errors because the middleware is already treating it
      var fetchedBook = req.book; // Fetched book retrived from the database by the middleware
      res.json(fetchedBook);
    })

    // > update
    .put(function(req, res) {
      var fetchedBook = req.book; // Fetched book retrived from the database by the middleware
      if(req.body._id) {
        delete req.body._id; // Doesn't allow to update the id even if its on the body of the request
      }

      // Update only the attributes that are present on the body of the request
      for(var attribute in req.body) {
        fetchedBook[attribute] = req.body[attribute];
      }

      fetchedBook.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(fetchedBook);
        }
      });
    })

    // > destroy
    .delete(function(req, res) {
      var fetchedBook = req.book;
      fetchedBook.remove(function (err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Book removed.');
        }
      })
    });


  return bookRouter;
}

module.exports = routes;