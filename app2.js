var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var crypto = require("crypto");

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/static"));
app.use(session({store: new RedisStore({
					host: 'localhost',
					port: 6379,
					db: 2,
					pass: ''}),
				 name: "sesija",
				 secret: "1234567890QWERTY",
				 resave: true,
				 saveUninitialized: true
}));

var sesija = {
	secret: "1234567890QWERTY",
	cookie: {loggedIn: false, sessid: 0}
}
app.use(session(sesija));

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "cloude"
});

app.listen(8080, function () {
	console.log("Listening on port 8080");
});

app.get("/test", function (request, response) {
	console.log(request.session);
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
					
					var query = connection.query("SELECT * FROM users WHERE username='" + username + "';", function (error, result) {
						var str = JSON.stringify(result);
						result = JSON.parse(str);
						
						var db_username = result[0].username;
						var db_password = result[0].password;
						var db_sessid = result[0].sessid;

						if (db_username == username && db_password == password){
							console.log("User successfully logged in!");
						}else{
							console.log("Wrong password!");
						}

					});

				} else {
					response.sendFile(__dirname + "/static/views/error.html?error=956");
				}
			}
		});

	} else {
		response.sendFile(__dirname + "/static/views/error.html?error=925");
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

		var sessid = randomValueHex(32);
		console.log(sessid);
		var post = {id: null, username: username, password: password, sessid: sessid};
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
		response.sendFile(__dirname + "/static/views/error.html?error=925");
	}
});

////////////* Register routes END *//////////////


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

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

/**********************************************/




app.get('/awesome', function(req, res) {

	console.log("Sesija:", req.session);

	req.session.sesija = '/awesome';
	res.send('Your Awesome.');
});

app.get('/radical', function(req, res) {
		if(req.session.lastPage) {
			res.write('Last page was: ' + req.session.lastPage + '. ');
		}

  req.session.lastPage = '/radical';
  res.send('What a radical visit!');
});

app.get('/tubular', function(req, res) {
  if(req.session.lastPage) {
		res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/tubular';
  res.send('Are you a surfer?');
});