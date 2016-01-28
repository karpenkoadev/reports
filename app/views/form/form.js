'use strict';

angular.module('myApp.formMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ["$scope", '$firebaseAuth', '$firebaseArray', function($scope, $firebaseAuth, $firebaseArray) {
    var ref = new Firebase("https://reports1.firebaseio.com/reports");
    var auth = $firebaseAuth(ref);
    var getAuth = auth.$getAuth(); // auth user info
    $scope.nameUser = 'Jhon';
    $scope.events = {
        selectItem : function($event){
            console.log($event, $scope.reports1);
        }
    }
    $scope.AddReprot = function() {
        var addFrom = $firebaseArray(ref);

        var dates = $scope.reports1.datePik;
        var countBild = $scope.reports1.countBild;
        var profiles = $scope.reports1.profiles;
        var linkOnBid = $scope.reports1.linkOnBid;
        var comments = $scope.reports1.comments;
    console.log(dates + countBild + profiles + linkOnBid + comments);


        setInterval(function(){
            console.log($scope.reports1);
        }, 1500);




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

    };

    $(document).ready(function() {
    // init date picker
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15 
        });
        $('select').material_select();
    });
}]);