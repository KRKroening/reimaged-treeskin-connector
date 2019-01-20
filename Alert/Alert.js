var mongoose = require('mongoose');  
var AlertSchema = new mongoose.Schema({  
    id: {type: String, required : true },
    user_id : {type: String, required : true},
    name : {type : String, required : true},
    creation_date: {type: Date, required : true }, 
    subject_id: {type : String, required: true},
    frequency: {type: Object, required: true},
    next_trigger_date: {type: Date, required: true},
    current_trigger_date: {type: Date, required: false},    
    active: {type: Boolean, required: true},
    notification_type : { type: Array, required : true },
    resolved : { type: Boolean, required : true },
});
mongoose.model('Alert', AlertSchema, 'Alerts'); //Needed to add last parameter
module.exports = mongoose.model('Alert');