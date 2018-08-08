var mongoose = require('mongoose');  
var EntrySchema = new mongoose.Schema({  
    id: {type: String, required: true},
    username: {type: String, required : true},
    password: {type: Date, required : true}, 
    email: {type : String, required: true},
    sms: {type: String, required: true},
    subjects: {type: Object, required: true}
});
mongoose.model('Entry', EntrySchema, 'Entries'); //Needed to add last parameter
module.exports = mongoose.model('Entry');