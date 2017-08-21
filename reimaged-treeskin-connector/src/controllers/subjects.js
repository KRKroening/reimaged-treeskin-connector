var mongoose = require('mongoose'),
Subjects = mongoose.model('Subjects');

exports.findAll = function(req, res){
  Subjects.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Subjects.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.findByName = function(req, res){
  var id = req.params.id;
  Subjects.findOne({'name':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Subjects.update({'name':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('Updated %d Subjects', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Subjects.create(req.body, function (err, subject) {
    if (err) return console.log(err); 
    return res.send(subject);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Subjects.remove({'name':id},function(result) {
    return res.send(result);
  });
};

// exports.import = function(req, res){
//   Musician.create( 
//     { "name": "Ben", "band": "DJ Code Red", "instrument": "Reason" },
//     { "name": "Mike D.","band": "Kingston Kats", "instrument": "drums" },
//     { "name": "Eric", "band": "Eric", "instrument": "piano" },
//     { "name": "Paul", "band": "The Eyeliners", "instrument": "guitar" }             
//   , function (err) {
//     if (err) return console.log(err); 
//     return res.send(202);
//   });
// };