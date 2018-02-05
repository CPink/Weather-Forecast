
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
    this.city = "New York"
})

//controllers
bbWeatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
    
}]);
     

bbWeatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService ){
    
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/weather?APPID=1a30405027e056950d37eeaa11bf7ebe", {
        callback: 'JSON_CALLBACK'}, { get: { method: "JSONP"}});


        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city });
        console.log($scope.weatherResult);
        
        $scope.convertToFahrenheit = function(degk){
            return Math.round((1.8 * (degk - 273)) + 32);

            $scope.convertTotDate = function(dt){
                return new Date(dt * 1000);
            }
        }

}]);

//Directives