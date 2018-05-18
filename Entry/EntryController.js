var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Entry = require('./Entry');

router.post('/', function (req, res) {
    console.log(req.body)
    Entry.create({
            entry: req.body.entry,
            date : parseInt(req.body.date)*1000,
            type: req.body.type,
            provider : req.body.provider,
            subject : req.body.subject
        }, 
        function (err, entry) {
            console.log(err)
            console.log(entry)
            if (err) return res.status(500).send(err + "There was a problem adding the information to the database.");
            res.status(200).send(entry);
        });
});


// RETURNS THE Entrys IN THE DATABASE BY FILTER
router.get('/', function (req, res) {
    console.log(req.query)
    var findBy = {
    }

    // workable date format
    req.query.toDate != null? req.query.toDate = parseInt(req.query.toDate)*1000 : false
    req.query.fromDate != null? req.query.fromDate = parseInt(req.query.fromDate)*1000 : false

    //build the filter object
    req.query.provider != null && req.query.provider != ''? findBy["provider"] = req.query.provider: false;
    req.query.subject != null? findBy["subject"] = req.query.subject : false;
    req.query.type != null ? findBy["type"] = req.query.type : false;
    req.query.contains != null ? findBy["entry"] = { $regex: req.query.contains} : false
    req.query.toDate != null? req.query.fromDate != null? //If to and from are not empty 
            findBy["date"] = { $gte : req.query.fromDate, $lte : req.query.toDate }: // set both ranges
            findBy["date"] = { $lte : req.query.toDate } : // if from is empty, set only to
            req.query.fromDate != null? // if to is empty, check if from is empty
            findBy["date"] = { $gte : req.query.fromDate}: // if from is not empty, set from
            false // if from is also  empty, do nothing
    console.log(typeof(req.query.provider))
    console.log(findBy)
    Entry.find(findBy, function (err, Entrys) {
        if (err) return res.status(500).send("There was a problem finding the Entry.");
        if (!Entrys) return res.status(404).send("No user found.");
        res.status(200).send(Entrys);
    });
});

// Not used
router.delete('/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id, req.body, function (err, Entry) {
        if (err) return res.status(500).send("There was a problem deleting the Entry.");
        res.status(200).send("Entry "+ Entry.name +" was deleted.");
    });
});


router.put('/:id', function (req, res) {    
    if(req.body.date.toString().length < 12){
        req.body.date = parseInt(req.body.date)*1000
    }
    Entry.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Entry) {
        if (err) return res.status(500).send("There was a problem updating the Entry.");
        res.status(200).send(Entry);
    });
});

module.exports = router;

/*
PostMan needs Content type to be manually set to RAW and JSON, otherwise body is empty
*/
