var mongoose = require('mongoose'),
Entries = mongoose.model('Entries');

exports.findAll = function(req, res){
  Entries.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Entries.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.findByName = function(req, res){
  var id = req.params.id;
  Entries.findOne({'id':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Entries.update({'id':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('Updated %d entry', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Entries.create(req.body, function (err, entry) {
    if (err) return console.log(err); 
    return res.send(entry);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Entries.remove({'id':id},function(result) {
    return res.send(result);
  });
};
