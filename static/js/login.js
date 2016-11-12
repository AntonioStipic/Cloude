var app = angular.module("cloude");

app.controller("LoginController",
function($rootScope, $scope, $http, $window) {
	this.username = "prazno";
	this.password = "prazno";
	var self = this;
	$rootScope.loginSuccess = false;

	this.send = function(username, password) {
		self.username = username;
		self.password = password;

		var data = {username:username, password:password};

		$http({
			data: data,
			method: "POST",
			url: "/login"
		}).then(function successCallback(response){
			console.log("Login response:", response);
			$rootScope.loginSuccess = true;
			$window.location.href = response.data;
		}), function errorCallback(response){
			console.log("LOGIN GRESKA");
			$rootScope.registerSuccess = false;
		}
	}
});
