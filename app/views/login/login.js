'use strict';

angular.module('myApp.loginMod', ['ngRoute', 'firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtr'
        });
    }])
    .controller('loginCtr', ['$scope','$location','$firebaseAuth','$firebaseArray','$firebaseObject', function($scope,$location,$firebaseAuth, $firebaseArray, $firebaseObject) {
        var ref = new Firebase("https://reports1.firebaseio.com");
        //var loginObj = $firebaseAuth(ref);
        var invalAuth = document.getElementById('invalidFormAuth');
        var usersListO = $firebaseObject(ref);
        $scope.user = {};
        $scope.SignIn = function(e) {
            var username = $scope.user.email;
            var password = $scope.user.password;
            ref.authWithPassword({
                    email    : username,
                    password : password
                },
                function authHandler(error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                        invalAuth.innerText =  error;
                    } else {
                        invalAuth.innerText = "Authenticated successfully";
                        $scope.$apply(function() {
                            var userUid = authData.uid;
                            usersListO.$loaded()
                                .then(function() {
                                    var userAuth = usersListO.users[userUid];
                                    var firstElemUser = Object.keys(userAuth);
                                    firstElemUser.push('test');
                                    console.log(firstElemUser[0]);
                                    var userRole = userAuth[firstElemUser[0]].role;
                                    console.log(userRole);
                                    console.log(usersListO);
                                    if (userRole === "admin"){
                                        $location.path('/admin');
                                    } else if (userRole === "bider") {
                                        $location.path('/form');
                                    } else {
                                        console.log('no role')
                                    }
                                });
                        });
                    }
                }
            );

        }
    }]);