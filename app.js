var express = require('express');
var app = express();
var db = require('./db');
 
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

var ProviderController = require('./Provider/providerController');
var SubjectController = require('./Subject/subjectController');
var TypeController = require('./Type/typeController')

app.use('/providers', ProviderController)
app.use('/subjects', SubjectController)
app.use('/types', TypeController)

module.exports = app;