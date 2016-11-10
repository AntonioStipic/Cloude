var express = require("express");

var app = express();

app.get("/", function (request, response) {
	response.send("It works!");
});

app.listen(8080, function () {
	console.log("Listening on port 8080");
})