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

app.post("/login", function (request, response) {
	var username = request.body.username;
	var password = request.body.password;

	if (username != undefined && password != undefined) {

		/* if (userExists(username)){
			var query = connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, result) {
				//console.log(result);
			});
		} else {
			console.log("User doesn't exists!");
		} */
		var doesExist = "";
		userExists(username, function (error ,data) {
			if (error) {
				console.log("USER EXISTS ERROR : ",err);            
			} else {            
				if (data == username) {
					console.log("User exists!");
				} else {
					console.log("User doesn't exist!");
				}
			}
		});

	} else {
		response.sendFile("/error.html?error=925");
	}
});

////////////* Login routes END *//////////////


////////////* Register routes START *////////////

app.get("/register", function (request, response) {
	response.sendFile(__dirname + "/static/views/register.html");
});

app.post("/register", function (request, response) {
	var username = request.body.username;
	var password = request.body.password;

	if (username != undefined && password != undefined) {

		// FOR some reason, this is unnecessary: connectToDatabase();

		var post = {id: null, username: username, password: password};
		var query = connection.query("INSERT INTO users SET ?", post, function(error, result) {
			if (error) {
				if (error.code == "ER_DUP_ENTRY") {
					console.log(error.code, "for user:", username);

					response.send({ error: 409, username: username });
					response.end();
				}else{
					console.log(error.code);
				}
			} else {
				console.log("User successfully added to database!");
				response.send({ error: 200, username: username });
				response.end();
			}
		});
	} else {
		response.sendFile("/views/error.html?error=925");
	}
});

////////////* Register routes END *//////////////


/**************** Functions *******************/

function connectToDatabase() {
	connection.connect(function(err) {
		if (err){
			console.log("Error connecting to database", err);
		} else {
			console.log("Successfully connected to database");
		}
	});
}

function userExists(username, callback) {
	var returns;
	var query = connection.query("SELECT username FROM users WHERE username='" + username + "';", function (error, result) {
		var str = JSON.stringify(result);
		result = JSON.parse(str);

		if (result[0]) {
			if (result[0].username == username) {
				callback(null,result[0].username);
			} else {
				callback(null,null);
			}
		} else {
			callback(null,null);
		}
	});
}

/**********************************************/