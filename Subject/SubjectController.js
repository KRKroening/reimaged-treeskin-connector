var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Subject = require('./Subject');
var User = require('../User/User');


router.post('/', function (req, res) {
    // console.lo g(req.body)
    Subject.create({
            id : req.body.id,
            name : req.body.name,
            age : req.body.age,
            breed : req.body.breed,
            gender: req.body.gender,
            colour: req.body.colour
        }, 
        function (err, Subject) {
            if (err) return res.status(500).send(err + "There was a problem adding the information to the database.");
            // Add to user document
            User.findOneAndUpdate({id : req.body.user}, {$push : { subjects : req.body.id}}, function(err, user){
                if (err) return res.status(500).send(err + "There was a problem adding the information to the database.");
                res.status(200).send("ok");
            })
        });
});


// RETURNS ALL THE Subjects IN THE DATABASE
router.get('/', function (req, res) {
    Subject.find({}).find(function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(Subjects);
    });
});

router.get('/one/:id', function (req, res) {
    Subject.find({"id":req.params.id}, function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the Subject.");
        if (!Subjects) return res.status(404).send("No user found.");
        res.status(200).send(Subjects);
    });
});

router.get('/user/:subjectlist', function (req, res) {
    Subject.find({id: {$in: req.params.subjectlist.split(",")}}, function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the Subject.");
        if (!Subjects) return res.status(404).send("No subjects found.");
        res.status(200).send(Subjects);
    });
});

router.delete('/:id', function (req, res) {
    Subject.findOneAndRemove({"id" : req.params.id}, function (err, Subject) {
        if (err) return res.status(500).send("There was a problem deleting the Subject.");
        res.status(200).send("Subject was deleted.");
    });
});

router.put('/:id', function (req, res) {    
    Subject.findOneAndUpdate({"id" : req.params.id}, req.body, {new: true}, function (err, Subject) {
        if (err) return res.status(500).send("There was a problem updating the Subject.");
        res.status(200).send(Subject);
    });
});

module.exports = router;

/*
PostMan needs Content type to be manually set to RAW and JSON, otherwise body is empty
*/
