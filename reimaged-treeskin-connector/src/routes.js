module.exports = function(app){

	var subjects = require('./controllers/subjects');

	app.get('/subjects', subjects.findAll); 
	app.get('/subjects/:id', subjects.findById); 
    app.get('/subjects/:name', subjects.findByName); 
    app.put('/subjects/:name', subjects.update);
    app.post('/subjects', subjects.add);
    app.delete('/subjects/:name', subjects.delete);
	// app.get('/import', subjects.import);  

	app.get('/hello', function(req, res) {
	    res.send('Hello New York\n');
	});


    var types = require('./controllers/types');

	app.get('/types', types.findAll); 
	app.get('/types/:id', types.findById); 
    app.get('/types/:name', types.findByName); 
    app.put('/types/:name', types.update);
    app.post('/types', types.add);
    app.delete('/types/:name', types.delete);
	// app.get('/import', subjects.import);  

	app.get('/hello', function(req, res) {
	    res.send('Hello New York\n');
	});

    var entries = require('./controllers/entries');

	app.get('/entries', entries.findAll); 
	app.get('/entries/:id', entries.findById); 
    app.get('/entries/:name', entries.findByName); 
    app.put('/entries/:name', entries.update);
    app.post('/entries', entries.add);
    app.delete('/entries/:name', entries.delete);
	// app.get('/import', subjects.import);  

	app.get('/hello', function(req, res) {
	    res.send('Hello New York\n');
	});
};
