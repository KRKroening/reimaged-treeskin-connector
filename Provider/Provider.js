var mongoose = require('mongoose');  
var ProviderSchema = new mongoose.Schema({  
    name: {type : String, required : true },
    type: {type : String, required : true },
    pPhone: {type : String, required : true },
    sPhone: {type : String, required : true },
    comp: {type : String, required : true } 
});
mongoose.model('Provider', ProviderSchema, 'Providers'); //Needed to add last parameter
module.exports = mongoose.model('Provider');