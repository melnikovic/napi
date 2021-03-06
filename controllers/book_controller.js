var bookController = function(Book) {

  var post = function (req, res) {
    var book = new Book(req.body);

    if(!req.body.name) {
      res.status(400);
      res.send('Name is required');
    } else {
      // Added current datetime when creating
      book.createdDate = new Date();
      book.save();

      // Separated those calls so the tests can sucess
      res.status(201);
      res.send(book);
    }
  };

  var get = function(req, res) {
    var query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }


    Book.find(query, function(err, books) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get
  }

};

module.exports = bookController;