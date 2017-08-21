var mongoose = require('mongoose'),
Types = mongoose.model('Types');

exports.findAll = function(req, res){
  Types.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Types.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.findByName = function(req, res){
  var id = req.params.id;
  Types.findOne({'name':id},function(err, result) {
    return res.send(result);
  });
};

exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Types.update({'name':id}, updates, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('Updated %d Types', numberAffected);
    return res.send(raw);
  });
}

exports.add = function(req, res) {
  Types.create(req.body, function (err, type) {
    if (err) return console.log(err); 
    return res.send(type);
  });
}

exports.delete = function(req, res){
  var id = req.params.id;
  Types.remove({'name':id},function(result) {
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