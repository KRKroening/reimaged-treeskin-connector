var express = require('express');
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Entry = require('./Entry');
var Subject = require('../Subject/Subject');
var genIds = require("../generate-ids")

router.post('/', function (req, res) {
    console.log(req.body)
    Entry.create({
            id: genIds("E"),
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
    // console.log(req.query)
    var findBy = {
    }

    

    // workable date format
    req.query.toDate != null? req.query.toDate = parseInt(req.query.toDate)*1000 : false
    req.query.fromDate != null? req.query.fromDate = parseInt(req.query.fromDate)*1000 : false

    console.log(new Date(req.query.fromDate))
    //build the filter object
    req.query.provider != null && req.query.provider != ''? findBy["provider"] = req.query.provider: false;
    req.query.subject != null? findBy["subject"] = req.query.subject : false;
    req.query.type != null && req.query.type != ''? findBy["type"] = req.query.type : false;
    req.query.contains != null && req.query.contains != '' ? findBy["entry"] = { $regex: req.query.contains} : false
    if(req.query.toDate != null ||  req.query.fromDate != null){
        findBy["date"] = {
            "$lte" : new Date(req.query.toDate).toISOString().
                                    replace(/T/, ' ').      // replace T with a space
                                    replace(/\..+/, '').
                                    replace("07:00", "00:00"),
            "$gte" : new Date(req.query.fromDate).toISOString().
                                    replace(/T/, ' ').      // replace T with a space
                                    replace(/\..+/, '').
                                    replace("07:00", "00:00")
        }
    }


    console.log(findBy)
    Entry.find(findBy, function (err, Entrys) {
        if (err) return res.status(500).send("There was a problem finding the Entry.");
        if (!Entrys) return res.status(404).send("No entry found.");
        res.status(200).send(Entrys);
    });
});

router.post("/download", function(req, res){
    //send to redis for service to pick up.
})

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

router.get("/download",async function(req,res){
    var filter = {}

    if(req.query.for != "") filter.subject = req.query.for;
    if(req.query.toDate != null ||  req.query.fromDate != null){
        filter["date"] = {
            "$lte" : new Date(req.query.toDate).toISOString().
                                    replace(/T/, ' ').      // replace T with a space
                                    replace(/\..+/, '').
                                    replace("07:00", "00:00"),
            "$gte" : new Date(req.query.fromDate).toISOString().
                                    replace(/T/, ' ').      // replace T with a space
                                    replace(/\..+/, '').
                                    replace("07:00", "00:00")
        }
    }
    if(req.query.providerName != "" && req.query.providerName != "Any") filter.provider = req.query.providerName

    var results = await Entry.find(filter).sort([['date', 1]]);
    if(results.length == 0) res.send("No entries found");

    var subjectName = await Subject.findOne({"id" : req.query.for})

// Create file
    var fileName = "public/"  + req.query.for + "_" + new Date().getTime() + ".csv";
    var data = "";
    data += `Subject: ${subjectName.name}; ${req.query.toDate} to ${req.query.fromDate} \r\n`
    data += "Date;Type;Provider;Entry \r\n";

    results.map( r => {
        data += `${formatDate(r.date)};${r.type};${r.provider};${r.entry.replace(/(\n|\r)/g,"").replace(/(;)/g, ",")} \r\n`
    })

    fs.writeFileSync(fileName, data)
    // res.download(fileName, fileName.split("/")[1]);
    res.send(fileName)
})

function pad(n) {
    return n<10 ? '0'+n : n;
}

function formatDate(date){
    var currentDate = new Date(date);
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); 
    var year = currentDate.getFullYear();

    return year + "/" + pad((month+1)) + "/" + pad(date);
}

module.exports = router;

/*
PostMan needs Content type to be manually set to RAW and JSON, otherwise body is empty
*/
