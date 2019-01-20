var mongoose = require('mongoose');
var mode = process.env.NODE_ENV
console.log(mode)
// if(mode === "prod")
    mongoose.connect('mongodb+srv://ts_admin:ts_password@ts-01-penqj.mongodb.net/Treeskin_Dublex')
// else
    // mongoose.connect('mongodb+srv://ts_admin:ts_password@ts-01-penqj.mongodb.net/Treeskin_db')

