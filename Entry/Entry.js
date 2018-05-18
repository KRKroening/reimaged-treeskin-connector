var mongoose = require('mongoose');  
var EntrySchema = new mongoose.Schema({  
    entry: {type: String, required : true },
    date: {type: Date, required : true }, 
    type: {type : String, required: true},
    provider: {type: String, required: true},
    subject: {type: String, required: true}
});
mongoose.model('Entry', EntrySchema, 'Entries'); //Needed to add last parameter
module.exports = mongoose.model('Entry');