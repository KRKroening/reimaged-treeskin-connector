var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Alerts = require('./Alert');
// var genIds = require("generateIds");


//Get all alerts
router.get('/', function (req, res) {
    Alerts.find({}, (err,result) => {
        if(err) res.status(500).send("Error when getting all Alerts: " + err)
        if (!result) res.status(200).send("No Alerts found");
        res.status(200).send(result);
    })
})


//Get alerts by user
router.get("/:user_id", function (req,res){
    const user_id = req.params.user_id;
    Alerts.find({"user_id" : user_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Alerts for user ${user_id}: ${err}`)
        if (!result) res.status(200).send("No Alerts found");
        res.status(200).send(result);
    })
})

router.get("/:alert_id", function (req,res){
    const alert_id = req.params.alert_id;
    Alerts.find({"alert_id" : alert_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Alert ${alert_id}: ${err}`)
        if (!result) res.status(200).send("No Alerts found");
        res.status(200).send(result);
    })
})

router.get("/resolve/:alert_id", function(res,req){
    // push to redis queue for service to take care of.

})

router.get("/alarm/:alert_id", function(res,req){
    // push to redis queue for service to take care of.
    //Push to quque to send an sms/email on

})

router.post('/', function (req, res) {
    console.log(req.body)
    Alerts.create({
            // id: genIds("A"),
            id: req.body.id,            
            creation_date: new Datetime(), 
            subject_id: req.body.subject_id,
            frequency: req.body.frequency,
            trigger_date: req.body.trigger_date,
            active: req.body.active
        }, 
        function (err, entry) {
            console.log(err)
            console.log(entry)
            if (err) return res.status(500).send(err + "There was a problem creating the Alert.");
            res.status(200).send(entry);
        });
});

router.put('/', function (req, res) {
    console.log(req.body)
    Alerts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Alerts) {
        if (err) return res.status(500).send("There was a problem updating the Alert.");
        res.status(200).send(Alerts);
    });
});

module.exports = router;