var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TypeSchema = new Schema({
  name: String,
  subtype: Array
});

mongoose.model('Types', TypeSchema);
