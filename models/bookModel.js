var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookModel = new Schema({
  title: { type: String },
  delay: { type: Number },
  response: { type: Array },
  createdDate: { type: Date },
  lastUsed: { type: Date },
  used: { type: Number },
  status: { type: Number, default: 200}
});

module.exports = mongoose.model('Book', bookModel);