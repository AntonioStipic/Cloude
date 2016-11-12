var app = angular.module("cloude");

app.controller("MainController", function ($scope, $window) {
	var self = this;

	$window.location.href = "/login";
});