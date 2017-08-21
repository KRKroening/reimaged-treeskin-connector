var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs');

var mongoUri = 'https://cloud.mongodb.com/api/atlas/v1.0/groups/Treeskin/clusters/TS-01'; 
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

// app.configure(function(){
//   app.use(express.bodyParser());
// });

require('./src/models/Types.js');
require('./src/models/Entries.js');
require('./src/models/Subjects.js');
require('./src/routes')(app);

app.listen(3000);
console.log('Listening on port 3000...');

