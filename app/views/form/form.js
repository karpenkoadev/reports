'use strict';

angular.module('myApp.formMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form/form.html',
    controller: 'formCtrl'
  });
}])

.controller('formCtrl', ["$scope", '$firebaseAuth', '$firebaseArray', function($scope, $firebaseAuth, $firebaseArray) {
    var userArr = [];
    var userObj = {};
    var ref = new Firebase("https://reports1.firebaseio.com/");
    var refAddReports = ref.child('reports');
    var refUsers = ref/*.child('users')*/;
    var auth = $firebaseAuth(ref);
    var usersList= $firebaseArray(refUsers);
    var getAuth = auth.$getAuth(); // auth user info
    console.log(getAuth)
    $scope.nameUser = 'Jhon';
    $scope.events = {
        selectItem : function($event){
            console.log($event, $scope.reports1);
        }
    };

    usersList.$loaded()
        .then(function() {
            angular.forEach(usersList, function (usersList) {
                console.log(usersList.users);
            });
            var email = usersList['2670ae88-d7cc-464a-b233-42514fade42c'];
            console.log(email)
            /*for (var i = 0; i < usersList.length; i++) {
                userObj[i] = usersList[i]
            }*/
        });


    $scope.AddReprot = function() {
        var addFrom = $firebaseArray(refAddReports);

        var nameBider = "Jhon Dou";
        var dates = $scope.reports1.datePik;
        var countBild = $scope.reports1.countBild;
        var profiles = $scope.reports1.profiles;
        var linkOnBid = $scope.reports1.linkOnBid;
        var comments = $scope.reports1.comments;



        addFrom.$add({
            nameBider: nameBider,
            dates: dates,
            countBild: countBild,
            profiles: profiles,
            linkOnBid: linkOnBid,
            comments: comments
        }).then(function(refAddReports) {
            console.log(refAddReports);
        }, function(error) {
            console.log("Error:", error);
        });

    };





    // init materialize plugin
    $(document).ready(function() {
    // init date picker
        $('.datepicker').pickadate({
            selectMonths: true, 
            selectYears: 15 
        });
        $('select').material_select();
        
    });
}]);