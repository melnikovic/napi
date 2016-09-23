var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookModel = new Schema({
  title: {
    type: String
  },
  author: { type: String },
  genre: { type: String },
  response: { type: Object },
  created: { type: Date },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookModel);