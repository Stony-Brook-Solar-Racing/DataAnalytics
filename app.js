var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//var MongoClient = require("mongodb").MongoClient;
//var uri = "mongodb+srv://admin:x2DN1adMTWiYC8Fu@solar-l3n4q.mongodb.net/solar?retryWrites=true&w=majority";
//var uri = "mongodb://localhost:27017/solar"
//var client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology : true});

const sqlite3 = require("sqlite3")
let db = new sqlite3.Database("./db/solar.db");
db.run("CREATE TABLE IF NOT EXISTS velocity(datetimeiso VARCHAR(64), velocity REAL)");

app.set("view engine","pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var recent = -1;
app.get("/",function(req, res) {
	db.get("SELECT * FROM velocity ORDER BY datetimeiso DESC LIMIT 1",[],(err,row)=>{
		if (err){
			console.log(err);
		}
		else{
			if (row){
			recent = row.velocity;
			}
				console.log("updateing");
		}
			res.render("index", {lastVelocity: recent});
	});
});

app.post("/submitForm", function(req, res) {
    console.log
	console.log(req.body);
    // console.log(req.body.ISOString);
    // console.log(parseFloat(req.body.velocity));
    /*
    client.db('solar').collection("solar").insertOne({
        ISOString : req.body.ISOString,
        velocity : parseFloat(req.body.velocity)
    });
    */
    db.run("INSERT INTO velocity(datetimeiso,velocity) VALUES (?, ?)", [req.body.ISOString, parseFloat(req.body.velocity)], (err) => {
    	if (err){
	 console.log(err);
	console.log(err.message);
	}
	else{
	   console.log("Successfully added value");
	}
    });
    
    var a = db.get("SELECT * FROM velocity ORDER BY datetimeiso DESC LIMIT 1",[], (err,row) =>{
   	if (err){
		Console
	}
	    console.log(row);
    });
});



app.get("/retrievedata", function(req, res) {
    var data = "";
    
   db.get("SELECT * FROM velocity ORDER BY datetimeiso DESC LIMIT 1",[],(err,row)=>{
		if (err){
			console.log(err);
		}
		else{
			if (row){
			recent = row.velocity;
			}
				res.json(row);
		}
	});
});



var server = app.listen(5000, function(){});

console.log("App started");
