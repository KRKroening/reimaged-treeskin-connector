var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
    id: {type: String, required: true},
    email: {type : String, required: true, unique: true},
    username: {type: String, required : true, unique: true},
    password: {type: String, required : true}, 
    sms: {type: String, required: false},
    subjects: {type: Array, required: true}
});
mongoose.model('User', UserSchema, 'Users'); //Needed to add last parameter
module.exports = mongoose.model('User');