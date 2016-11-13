var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cookieParser = require("cookie-parser");
var crypto = require("crypto");
var session = require('express-session');

var app = express();

app.use(session ({
	secret: "secret",
	resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/static/views');

var connection = mysql.createConnection ({
	host: "localhost",
	user: "root",
	password: "",
	database: "cloude"
});

app.listen(8080, function () {
	console.log("Listening on port 8080");
});

app.get("/home", function (request, response) {
	sess = request.session;
	
	if (sess.sessid){
		//response.send("User logged in with session: " + sess.sessid);
		sessidExists(sess.sessid, function (error ,data) {
			if (error) {
				console.log("SESSID EXISTS ERROR : ",err);   
			} else {
				response.sendFile(__dirname + "/static/views/home.html");
			}
		});
	} else {
		response.redirect("/login");
	}
});

app.get("/error", function (request, response) {
	response.send("ERROR");
});

app.get("/logout", function (request, response) {
	var username = request.session.username;
	request.session.destroy();
	console.log("User: '" + username + "' successfully logged out!");
	response.redirect("/");
});

app.post("/authHome", function (request, response) {
	var data = request.body.data;

	if (data == "home"){
		var sess = request.session;
		var responseData = {username: sess.username, sessid: sess.sessid};
		response.send(responseData);
	}
});

////////////* Login routes START *////////////

app.get("/login", function (request, response) {
	if (request.session.sessid){
		response.redirect("/home");
	}else{
		response.sendFile(__dirname + "/static/views/login.html");
	}
});

app.post("/login", function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var sess = request.session;

	if (username != undefined && password != undefined) {

		/* if (userExists(username)){
			var query = connection.query("SELECT * FROM users WHERE username='" + username + "';", function(error, result) {
				//console.log(result);
			});
		} else {
			console.log("User doesn't exists!");
		} */
		userExists(username, function (error ,data) {
			var returns = 0;
			if (error) {
				console.log("USER EXISTS ERROR : ",err);   
			} else {
				db_username = "prazno";
				db_password = "prazno";
				db_sessid = "prazno";
				if (data == username) {
					
					var query = connection.query("SELECT * FROM users WHERE username='" + username + "';", function (error, result) {
						var str = JSON.stringify(result);
						result = JSON.parse(str);
						
						var db_username = result[0].username;
						var db_password = result[0].password;
						var db_sessid = result[0].sessid;

						if (db_username == username && db_password == password){
							console.log("User: '" + username + "' successfully logged in!");
							request.session.sessid = db_sessid;
							request.session.username = db_username;
							response.send("/home");
						}else{
							console.log("User: '" + username + "' entered wrong password!");
							response.send("/error?error=924");
						}
						//response.render("login.html");
					});

				} else {
					console.log("Entered user: '" + username + "' does not exist!");
					response.send("error?error=956");
				}
			}
		});

	} else {
		console.log("Username: '" + username + "', password: '" + password + "', one of them is undefined");
		response.send("error?error=925");
	}
});

////////////* Login routes END *//////////////


////////////* Register routes START *////////////

app.get("/register", function (request, response) {
	if (request.session.sessid){
		response.redirect("/home");
	}else{
		response.sendFile(__dirname + "/static/views/register.html");
	}
});

app.post("/register", function (request, response) {
	var username = request.body.username;
	var password = request.body.password;

	if (username != undefined && password != undefined) {

		// FOR some reason, this is unnecessary: connectToDatabase();

		var sessid = randomValueHex(32);
		console.log(sessid);
		var post = {id: null, username: username, password: password, sessid: sessid};
		var query = connection.query("INSERT INTO users SET ?", post, function(error, result) {
			if (error) {
				if (error.code == "ER_DUP_ENTRY") {
					console.log(error.code, "for user:", username);

					response.send("/error?error=409");
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
		//response.sendFile(__dirname + "/static/views/error.html?error=925");
		response.send("/error?error=925");
	}
});

////////////* Register routes END *//////////////


////////////* Secure routes START *////////////

var router = express.Router();

router.use(function (request, response, next) {


	next();
});

router.get("/saveFile", function (request, response) {
	console.log("Hello World!");
	response.send("Hello World!");
});

app.use("/api", router);

////////////* Secure routes END *//////////////

app.get('*', function (request, response) {
  response.status(404).sendFile(__dirname + "/static/views/404.html");
});

/**************** Functions *******************/

function connectToDatabase () {
	connection.connect (function(err) {
		if (err){
			console.log("Error connecting to database", err);
		} else {
			console.log("Successfully connected to database");
		}
	});
}

function userExists (username, callback) {
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

function sessidExists (sessid, callback) {
	var query = connection.query("SELECT sessid FROM users WHERE sessid='" + sessid + "';", function (error, result) {
		var str = JSON.stringify(result);
		result = JSON.parse(str);
		if (result[0]) {
			if (result[0].sessid == sessid) {
				callback(null,result[0].sessid);
			} else {
				callback(null,null);
			}
		} else {
			callback(null,null);
		}
	});
}

function randomValueHex (len) {
	return crypto.randomBytes(Math.ceil(len/2))
	.toString('hex') // convert to hexadecimal format
	.slice(0,len);   // return required number of characters
}
/**********************************************/