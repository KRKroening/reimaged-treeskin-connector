process.env.NODE_ENV = "prod"

var express = require('express');
var app = express();
var db = require('./db');
var genIds = require("./generate-ids")
 
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Content Type: application/json');
  next();
});

var ProviderController = require('./Provider/providerController');
var SubjectController = require('./Subject/subjectController');
var TypeController = require('./Type/typeController')
var EntryController = require('./Entry/entryController');
var AlertController = require('./Alert/alertController');
var UserController = require('./User/userController');

app.use('/provider', ProviderController)
app.use('/subject', SubjectController)
app.use('/types', TypeController)
app.use('/entry', EntryController)
app.use('/alert', AlertController)
app.use('/user', UserController)

module.exports = app;