var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Provider = require('./Provider');

router.post('/', function (req, res) {
    // console.lo g(req.body)
    Provider.create({
            id : req.body.id,
            name : req.body.name,
            type : req.body.type,
            pPhone : req.body.pPhone,
            sPhone: req.body.sPhone,
            comp: req.body.comp
        }, 
        function (err, provider) {
            if (err) return res.status(500).send(err + "There was a problem adding the information to the database.");
            res.status(200).send(provider);
        });
});


// RETURNS ALL THE providers IN THE DATABASE
router.get('/', function (req, res) {
    Provider.find({}).find(function (err, providers) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(providers);
    });
});

router.get('/:id', function (req, res) {
    Provider.find({ "id" : req.params.id}, function (err, providers) {
        if (err) return res.status(500).send("There was a problem finding the provider.");
        if (!providers) return res.status(404).send("No user found.");
        res.status(200).send(providers);
    });
});

router.delete('/:id', function (req, res) {
    Provider.findOneAndRemove({"id" : req.params.id}, function (err, provider) {
        if (err) return res.status(500).send("There was a problem deleting the provider.");
        res.status(200).send("Provider "+ provider.name +" was deleted.");
    });
});

router.put('/:id', function (req, res) {    
    Provider.findOneAndUpdate({"id":req.params.id}, req.body, {new: true}, function (err, provider) {
        if (err) return res.status(500).send("There was a problem updating the provider.");
        res.status(200).send(provider);
    });
});

module.exports = router;

/*
PostMan needs Content type to be manually set to RAW and JSON, otherwise body is empty
*/
