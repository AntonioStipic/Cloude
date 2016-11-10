var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express();
app.use(express.static(__dirname + "/static"));

app.listen(8080, function () {
	console.log("Listening on port 8080");
});

app.get("/", function (request, response) {
	response.send("It works!");
});

////////////* Login routes START *////////////

app.get("/login", function (request, response) {
	response.sendFile(__dirname + "/static/views/login.html");
});

////////////* Login routes END *//////////////


////////////* Register routes START *////////////

app.get("/register", function (request, response) {
	response.sendFile(__dirname + "/static/views/register.html");
});

app.post("/register", function (request, response) {
	/* var username = request.body.username;
	var password = request.body.password;

	if (username != undefined && password != undefined){

	}*/
	console.log(request.body);
});

////////////* Register routes END *//////////////