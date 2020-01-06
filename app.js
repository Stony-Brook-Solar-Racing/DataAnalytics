var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb+srv://admin:x2DN1adMTWiYC8Fu@solar-l3n4q.mongodb.net/solar?retryWrites=true&w=majority";
var client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});

client.connect(function(err) {
    if (err) {
        console.log("Could not connect to MongoDB");
    } else {
        console.log("Connected to MongoDB");
    }
});

app.set("view engine","pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req, res) {
    res.render("index");
});

app.post("/submitForm", function(req, res) {
    // console.log(req.body.ISOString);
    // console.log(parseFloat(req.body.velocity));
    client.db('solar').collection("solar").insertOne({
        ISOString : req.body.ISOString,
        velocity : parseFloat(req.body.velocity)
    });
    res.render("index");
});

app.get("apipost", function(req, res) {

});

var server = app.listen(5000, function(){});

console.log("App started");