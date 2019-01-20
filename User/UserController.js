var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');
var genIds = require("../generate-ids")


//Get all alerts
router.get('/', function (req, res) {
    User.find({}, (err, result) => {
        if (err) res.status(500).send("Error when getting all Users: " + err)
        if (!result) res.status(200).send("No Users found");
        res.status(200).send(result);
    })
})


//Get alerts by user
router.get("/:username", function (req, res) {
    const username = req.params.username;
    User.find({ $or: [{ email: username }, { username: username }] }, (err, result) => {
        if (err) res.status(500).send(`Error when getting user ${username}: ${err}`)
        if (result[0] == undefined) res.status(200).send("No User found");
        else res.status(200).send(result);
    })
})

router.get("/:username/:pass", function (req, res) {
    const username = req.params.username;
    const pass = req.params.pass;

    User.find({
        password: pass,
        $or: [{ email: username }, { username: username }]
    }, (err, result) => {
        if (err) res.status(500).send(err)
        if (result[0] == undefined) res.status(200).send(false);
        else res.status(200).send(true);
    })
})

router.post('/register', function (req, res) {
    console.log(req.body)
    console.log(typeof req.body)
    User.create({
        id: genIds("U"),
        creation_date: new Date(),
        subjects: [],
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },
        function (err, user) {
            console.log(err)
            console.log(user)
            if (err) return res.status(500).send(err.message);
            console.log("result : " + user)

            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, Users) {
        if (err) return res.status(500).send("There was a problem updating the User.");
        res.status(200).send(Users);
    });
});

router.put('/password', function (req, res) {
    console.log(req.body)
    User.findOneAndUpdate({id:req.params.id, password : req.params.current}, function(err, user){
        console.log(user)
        if (err) return res.status(500).send("There was a problem updating the User.");
        if(user.length == 0) res.send("Current password does not match.")
        res.status(200).send("ok");
    });
});


module.exports = router;