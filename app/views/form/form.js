'use strict';

angular.module('myApp.formMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ["$scope", '$firebaseAuth', '$firebaseArray', function($scope, $firebaseAuth, $firebaseArray) {
    var ref = new Firebase("https://reports1.firebaseio.com");
    var auth = $firebaseAuth(ref);
    var getAuth = auth.$getAuth(); // auth user info
    $scope.nameUser = 'Jhon';
    $scope.AddReprot = function() {
        var addFrom = $firebaseArray(ref);

        var dates = $scope.reports1.datePik;
        var countBild = $scope.reports1.countBild;
        var profiles = $scope.reports1.profiles;
        var linkOnBid = $scope.reports1.linkOnBid;
        var comments = $scope.reports1.comments;

        if (dates === "undefined") {
            dates = 'Не заполненно'
        } else if (countBild === "undefined") {
            countBild = 'Не заполненно'
        } else if (profiles === "undefined") {
            profiles = 'Не заполненно'
        } else if (linkOnBid === "undefined") {
            linkOnBid = 'Не заполненно'
        } else if (comments === "undefined") {
            comments = 'Не заполненно'
        }



    console.log(dates + countBild + profiles + linkOnBid + comments)







        addFrom.$add({
            dates: dates,
            countBild: countBild,
            profiles: profiles,
            linkOnBid: linkOnBid,
            comments: comments
        }).then(function(ref) {
            console.log(ref);
        }, function(error) {
            console.log("Error:", error);
        });

    }




    $(document).ready(function() {
    // init date picker
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15 
        });
        $('select').material_select();
    });
}]);