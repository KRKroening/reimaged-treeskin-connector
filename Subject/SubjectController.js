var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Subject = require('./Subject');

router.post('/', function (req, res) {
    // console.lo g(req.body)
    Subject.create({
            name : req.body.name,
            age : req.body.age,
            breed : req.body.breed,
            gender: req.body.gender,
            colour: req.body.colour
        }, 
        function (err, Subject) {
            if (err) return res.status(500).send(err + "There was a problem adding the information to the database.");
            res.status(200).send(Subject);
        });
});


// RETURNS ALL THE Subjects IN THE DATABASE
router.get('/', function (req, res) {
    Subject.find({}).find(function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(Subjects);
    });
});

router.get('/:id', function (req, res) {
    Subject.findById(req.params.id, function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the Subject.");
        if (!Subjects) return res.status(404).send("No user found.");
        res.status(200).send(Subjects);
    });
});

router.delete('/:id', function (req, res) {
    Subject.findByIdAndRemove(req.params.id, function (err, Subject) {
        if (err) return res.status(500).send("There was a problem deleting the Subject.");
        res.status(200).send("Subject "+ Subject.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {    
    Subject.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Subject) {
        if (err) return res.status(500).send("There was a problem updating the Subject.");
        res.status(200).send(Subject);
    });
});

module.exports = router;

/*
PostMan needs Content type to be manually set to RAW and JSON, otherwise body is empty
*/
