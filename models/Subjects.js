var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SubjectSchema = new Schema({
  name: String,
  reg_name: String,
  birthday: Date,
  breed: String,
  sex: String,
  height: String,
  primary_colour: String
});

mongoose.model('Subjects', SubjectSchema);
