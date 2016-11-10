var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "cloude"
});

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
	var username = request.body.username;
	var password = request.body.password;

	if (username != undefined && password != undefined){
		connection.connect(function(err) {
			if (err){
				console.log("Error connecting to database", err);
			} else {
				console.log("Successfully connected to database");
			}
		});

		var post  = {id: null, username: username, password: password};
		var query = connection.query('INSERT INTO users SET ?', post, function(error, result) {
			if (error) {
				if (error.code == "ER_DUP_ENTRY") {
					console.log("ER_DUP_ENTRY");
					//response.redirect("./static/views/error.html");

					response.send({ error: 409, username: username });
					response.end();
				}
			} else {
				console.log("User successfully added to database!");
				response.send({ error: 200, username: username });
				response.end();
			}
		});
	}
});

////////////* Register routes END *//////////////