var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
// var genIds = require("generateIds");


//Get all alerts
router.get('/', function (req, res) {
    User.find({}, (err,result) => {
        if(err) res.status(500).send("Error when getting all Users: " + err)
        if (!result) res.status(200).send("No Users found");
        res.status(200).send(result);
    })
})


//Get alerts by user
router.get("/:user_id", function (req,res){
    const user_id = req.params.user_id;
    User.find({"user_id" : user_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Users for user ${user_id}: ${err}`)
        if (!result) res.status(200).send("No Users found");
        res.status(200).send(result);
    })
})

router.get("/:alert_id", function (req,res){
    const alert_id = req.params.alert_id;
    User.find({"id" : alert_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting User ${alert_id}: ${err}`)
        if (!result) res.status(200).send("No Users found");
        res.status(200).send(result);
    })
})

router.post('/', function (req, res) {
    console.log(req.body)
    User.create({
            id: genIds("A"),
            creation_date: new Datetime(), 
            subject_id: req.body.subject_id,
            frequency: req.body.frequency,
            trigger_date: req.body.trigger_date,
            active: req.body.active
        }, 
        function (err, entry) {
            console.log(err)
            console.log(entry)
            if (err) return res.status(500).send(err + "There was a problem creating the User.");
            res.status(200).send(entry);
        });
});

router.put('/', function (req, res) {
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Users) {
        if (err) return res.status(500).send("There was a problem updating the User.");
        res.status(200).send(Users);
    });
});

module.exports = router;