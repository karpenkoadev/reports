'use strict';

angular.module('myApp.loginMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtr'
  });
}])
    .controller('loginCtr', ['$scope','$location','$firebaseAuth', function($scope,$location,$firebaseAuth) {
        var ref = new Firebase("https://reports1.firebaseio.com");
        var loginObj = $firebaseAuth(ref);
        var invalAuth = document.getElementById('invalidFormAuth');
        $scope.user = {};
        $scope.SignIn = function(e) {
            var username = $scope.user.email;
            var password = $scope.user.password;
            ref.authWithPassword({
                    email    : username,
                    password : password
                },
                function authHandler(error, authData) {
                    //console.log(authData)
                    if (error) {
                        console.log("Login Failed!", error);
                        invalAuth.innerText =  error;
                    } else {
                        invalAuth.innerText = "Authenticated successfully";
                        $scope.$apply(function() {
                            $location.path('/form');
                        });
                    }
                }
            );

        }
    }]);