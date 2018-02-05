(function(){

'use strict';

var bbWeatherApp = angular.module('bbWeatherApp', ['ngRoute', 'ngResource']);

//routes
bbWeatherApp.config( function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: 'views/forecast.html',
            controller: 'forecastController'
        })
});


bbWeatherApp.service('cityService', function(){
    this.city = "New York, NY"
})

//controllers
bbWeatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;
    $scope.watch('city', function(){
        cityService.city = $scope.city;
    });
    
}]);
     

bbWeatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
    
    $scope.city = cityService.city;

}]);

}());