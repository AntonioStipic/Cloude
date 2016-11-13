var app = angular.module("cloude");

app.controller("HomeController",
function($rootScope, $scope, $http, $window) {
	var self = this;

	var data = {data: "home"};
	$http({
		data: data,
		method: "POST",
		url: "/authHome"
	}).then(function successCallback(response){
		$rootScope.data = response.data;
	}), function errorCallback(response){
		console.log("HOME GRESKA");
	}
	
});
