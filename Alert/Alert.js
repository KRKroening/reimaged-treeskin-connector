var mongoose = require('mongoose');  
var AlertSchema = new mongoose.Schema({  
    id: {type: String, required : true },
    creation_date: {type: Date, required : true }, 
    subject_id: {type : String, required: true},
    frequency: {type: String, required: true},
    trigger_date: {type: String, required: true},
    active: {type: Boolean, required: true}
});
mongoose.model('Alert', AlertSchema, 'Alerts'); //Needed to add last parameter
module.exports = mongoose.model('Alert');