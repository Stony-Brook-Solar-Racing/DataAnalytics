// Express app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// Database setup
const sqlite3 = require("sqlite3")
let db = new sqlite3.Database("./db/solar.db");
db.run("CREATE TABLE IF NOT EXISTS data(datetimeiso VARCHAR(64), velocity REAL, battery REAL, waterlevel REAL)");

// view engine is pug
app.set("view engine","pug");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var recent = -1;
var v, b, w = -1.0;


// Screen - home page (show earliest data from the database)
app.get("/",function(req, res) {
	db.get("SELECT * FROM data ORDER BY datetimeiso DESC LIMIT 1",[],(err,row)=>{
		if (err){
			console.log(err);
		}
		else{
			if (row){
			    v = row.velocity;
			    b = row.battery;
			    w = row.waterlevel;
			    //console.log(b);
			}
				console.log("updating");
		}
	    res.render("index", {lastVelocity: v, lastBattery: b, lastWaterLevel: w});
	});
});

// Post data into database
app.post("/submitForm", function(req, res) {
    db.run("INSERT INTO data(datetimeiso,velocity,battery,waterlevel) VALUES (?, ?, ?, ?)", [req.body.ISOString, parseFloat(req.body.velocity),parseFloat(req.body.battery),parseFloat(req.body.waterlevel)], (err) => {
    	if (err){
	 console.log(err);
	console.log(err.message);
	}
	else{
	   console.log("Successfully added value");
	}
    });
    
    var a = db.get("SELECT * FROM data ORDER BY datetimeiso DESC LIMIT 1",[], (err,row) =>{
   	if (err){
		Console
	}
	    console.log(row);
    });
});



app.get("/retrievedata", function(req, res) {
    var data = "";
    
   db.get("SELECT * FROM data ORDER BY datetimeiso DESC LIMIT 1",[],(err,row)=>{
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
