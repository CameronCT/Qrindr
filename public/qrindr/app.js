var app = angular.module('QrindrApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'qrindr/views/home.html'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/match/:id', {
            templateUrl: 'views/match.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});