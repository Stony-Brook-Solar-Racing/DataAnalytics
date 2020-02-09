const path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,"public" )));

//var MongoClient = require("mongodb").MongoClient;
//var uri = "mongodb+srv://admin:x2DN1adMTWiYC8Fu@solar-l3n4q.mongodb.net/solar?retryWrites=true&w=majority";
//var client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});


const sqlite3=require("sqlite3")
let db=new sqlite3.Database("./db/solar.db");
var uri = "mongodb://localhost:27017/solar";
db.run("CREATE TABLE IF NOT EXISTS velocity (datetimeiso VARCHAR(64), velocity REAL)");

app.set("view engine","pug");
//app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var recent= -1;
app.get("/",function(req, res) {
    db.get("SELECT * FROM velocity ORDER BY datetimeiso DESC LIMIT 1", [], (err, row)=>{
      if (err || !row){
        console.log(err);
      }
      else {
        console.log(row);
        recent = row.velocity;
        console.log("Value Successfully found.");
      }
      res.render("index", {lastVelocity: recent});
    });
});

app.post("/submitForm", function(req, res) {
    db.run("INSERT INTO velocity(datatimeiso, velocity) VALUES (?,?)", [req.body.ISOString, parseFloat(req.body.velocity)], (err) =>{
    if (err){
      console.log(err);
      console.log(err.message);
    }
    else {
      console.log("Successfully added value");
    }
    });
});

app.get("/retrievedata", function(req, res) {
    var data = "";
/*    client.db('solar').collection('solar').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });*/
});

var server = app.listen(5000, function(){});

console.log("App started");
