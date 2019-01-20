var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var moment = require("moment");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Alerts = require('./Alert');


//Get all alerts
router.get('/', function (req, res) {
    Alerts.find({}, (err,result) => {
        if(err) res.status(500).send("Error when getting all Alerts: " + err)
        res.status(200).send(results);
    })
})


//Get alerts by user
router.get("/user/:user_id", function (req,res){
    const user_id = req.params.user_id;
    Alerts.find({"user_id" : user_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Alerts for user ${user_id}: ${err}`)
        res.status(200).send(results);
    })
})

router.get("/user/unresolved/:user_id", function (req,res){
    const user_id = req.params.user_id;
    Alerts.find({"user_id" : user_id, "resolved" : false}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Alerts for user ${user_id}: ${err}`)
        else res.status(200).send(results);
    })
})

router.get("/:alert_id", function (req,res){
    const alert_id = req.params.alert_id;
    Alerts.find({"id" : alert_id}, (err,results) => {
        if(err) res.status(500).send(`Error when getting Alert ${alert_id}: ${err}`)
        if (results[0] == undefined) res.status(200).send("No Alerts found");
        else res.status(200).send(results);
    })
})

router.put("/resolve/:alert_id", function(res,req){
    // push to redis queue for service to take care of.

})

router.post('/', function (req, res) {
    const gen_uid = "A" + Math.random().toString(36).substring(7);
    const freq = { "hours" : req.body.frequency.hours, "denom" :  req.body.frequency.denom}
    Alerts.create({
            id : gen_uid,
            user_id : req.body.user_id,
            name : req.body.name,
            creation_date: new Date(), 
            subject_id: req.body.subject_id,
            frequency: freq,
            next_trigger_date: moment(req.body.trigger_date*1000),
            current_trigger_date : null,
            active: req.body.active == "on" ? true : false,
            notification_type : req.body.notification_type,
            resolved : true
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