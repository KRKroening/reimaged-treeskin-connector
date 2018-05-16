var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Type = require('./Type');


router.get('/', function (req, res) {
    Type.find({}).find(function (err, type) {
        if (err) return res.status(500).send("There was a problem finding the types.");
        res.status(200).send(type);
    });
});

router.get('/:id', function (req, res) {
    Type.findById(req.params.id, function (err, type) {
        if (err) return res.status(500).send("There was a problem finding the subtypes.");
        if (!type) return res.status(404).send("No type found.");
        res.status(200).send(type);
    });
});

module.exports = router;