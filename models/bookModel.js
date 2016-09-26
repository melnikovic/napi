var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bookModel = new Schema({
  userId: { type: String },
  name: { type: String },
  output: { type: Array },
  delay: { type: Number },
  statusCode: { type: Number, default: 200},
  method: { type: Number, default: 1},
  createdDate: { type: Date },
  lastUsed: { type: Date },
  used: { type: Number }
});

module.exports = mongoose.model('Book', bookModel);