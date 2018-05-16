var mongoose = require('mongoose');  
var SubjectSchema = new mongoose.Schema({  
    name: {type : String, required : true },
    age: {type : Number, required : true },
    breed: {type : String, required : true },
    gender: {type : String, required : true },
    colour: {type : String, required : true } 
});
mongoose.model('Subject', SubjectSchema, 'Subjects'); //Needed to add last parameter
module.exports = mongoose.model('Subject');