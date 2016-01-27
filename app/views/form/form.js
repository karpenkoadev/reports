'use strict';

angular.module('myApp.formMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
    var ref = new Firebase("https://reports1.firebaseio.com");
    var auth = $firebaseAuth(ref);
    var getAuth = auth.$getAuth(); // auth user info
    console.log()

    // init date picker
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $(document).ready(function() {
        $('select').material_select();
    });
}]);