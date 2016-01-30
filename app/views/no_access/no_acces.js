angular.module('myApp.noAcces', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/no_access', {
        templateUrl:'views/no_access/no_acces.html',
        controller:'noAccesCtr'
    })
}])
    .controller('noAccesCtr', ['$scope', '$location', function($scope, $location){

    }])