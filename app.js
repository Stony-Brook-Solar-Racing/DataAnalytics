var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require("mongodb").MongoClient;
//var uri = "mongodb+srv://admin:x2DN1adMTWiYC8Fu@solar-l3n4q.mongodb.net/solar?retryWrites=true&w=majority";
var uri = "mongodb://localhost:27017/solar";
var client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});

var pug = require('pug')
//var compiled_index = pug.compileFile('index.pug')

client.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB");
    }
});

app.set("view engine","pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req, res) {
    res.render('index', {lastVelocity : 5});
    //res.render("index");
});

app.post("/submitForm", function(req, res) {
    console.log(req.body);
    // console.log(parseFloat(req.body.velocity));
    client.db('solar').collection("solar").insertOne({
        ISOString : req.body.ISOString,
        velocity : parseFloat(req.body.velocity)
    });
    res.render("index");
    console.log(client.db('solar').collection('solar').find());
});



app.get("/retrievedata", function(req, res) {
    var data = "";
    client.db('solar').collection('solar').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});



var server = app.listen(5000, function(){});

console.log("App started");