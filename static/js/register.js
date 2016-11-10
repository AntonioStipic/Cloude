var app = angular.module("cloude");

app.controller("RegisterController",
function($rootScope, $scope, $http) {
	this.username = "prazno";
	this.password = "prazno";
	var self = this;
	$rootScope.registerSuccess = false;

	this.send = function(username, password) {
		self.username = username;
		self.password = password;

		var data = {username:username, password:password};

		$http({
			data: data,
			method: "POST",
			url: "/register"
		}).then(function successCallback(response){
			console.log("Register response:", response);
			$rootScope.registerSuccess = true;
		}), function errorCallback(response){
			console.log("REGISTER GRESKA");
			$rootScope.registerSuccess = false;
		}
	}
});
