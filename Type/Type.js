var mongoose = require('mongoose');  
var TypeSchema = new mongoose.Schema({  
    name: {type : String, required : true },
    subtype: {type : [String], required : true }, 
});
mongoose.model('Type', TypeSchema, 'Visit_Types'); //Needed to add last parameter
module.exports = mongoose.model('Type');