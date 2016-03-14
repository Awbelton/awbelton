var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);


myApp.controller('mainCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.title = "Test";
}]);

myApp.controller('aboutCtrl', ['$scope', '$routeParams', '$http', '$resource', function($scope, $routeParams, $http, $resource) {
  $scope.title = "About Me";

  // RESUME GET
  $http.get('/public/resume.json').then(function(response) {
    $scope.resume = response.data;
    $scope.descriptions = $scope.resume[0].description;
    console.log($scope.descriptions);
    var total = response.data.length;

  }, function error(response) {
    console.log("Unable to get a response.");
  });

  // SKILLS GET
  $http.get('/public/skills.json').then(function(response) {
    $scope.skills = response.data;
  }, function error(response){
    console.log("Unable to get a response.");
  });
}]);

myApp.controller('portfolioCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.title = "Portfolio";
}]);

myApp.controller('contactCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.title = "Contact Me";
  $scope.focused = function(id) {
    var elem = document.getElementById(id);
    elem.placeholder = '';
  };
  $scope.refocused = function(id) {
    var elem = document.getElementById(id);
    elem.placeholder = id;
  }
}]);
