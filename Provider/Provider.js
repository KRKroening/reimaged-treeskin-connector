var mongoose = require('mongoose');  
var ProviderSchema = new mongoose.Schema({  
    id: {type: String, required: true},    
    name: {type : String, required : true },
    type: {type : String, required : true },
    pPhone: {type : String, required : true },
    sPhone: {type : String, required : false },
    comp: {type : String, required : true } 
});
mongoose.model('Provider', ProviderSchema, 'Providers'); //Needed to add last parameter
module.exports = mongoose.model('Provider');