var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EntriesSchema = new Schema({
  id: String,
  date: Date,
  subject: String,
  type: String,
  subtype: String,
  title: String,
  body: String,
  author: String
});

mongoose.model('Entries', EntriesSchema);
