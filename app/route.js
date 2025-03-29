var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/items', {
            templateUrl: 'views/items.html',
            controller: 'ItemsController'
        })
        .when('/items/:id', {
            templateUrl: 'views/item-detail.html',
            controller: 'ItemDetailController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);