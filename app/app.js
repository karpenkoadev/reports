'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.loginMod',
  'myApp.formMod',
  'myApp.admin',
  'myApp.noAcces'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({
          redirectTo: '/login'
      });
    }]);
