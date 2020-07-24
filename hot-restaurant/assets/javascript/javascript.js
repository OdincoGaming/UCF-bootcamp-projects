var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reserveArray = [
	{
		customerName: 'Matt',
		customerEmail: 'matt@gmail.com',
		customerID: 'cust1',
		PhoneNumber: '000-000-0000'
	}
];

var waitingArray = [
  	{
	customerName: 'Ralph',
	customerEmail: 'ralph@gmail.com',
	customerID: 'cust2',
	PhoneNumber: '000-000-0000'
	}
];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "../../tables.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "../../reserve.html"));
});

app.post("/api/reservation", function(req, res){
	if(reserveArray.length < 5) { 
		reserveArray.push(req.body);
		res.json(true);
		} else {
		waitingArray.push(req.body);
		res.json(false);
	};
	console.log(req.body)
});




app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});