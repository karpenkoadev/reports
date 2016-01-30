'use strict';

angular.module('myApp.formMod', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/form', {
    templateUrl: 'views/form/form.html',
    controller: 'formCtrl'
  });
}])
.controller('formCtrl', ["$scope",'$location', '$firebaseAuth', '$firebaseArray','$firebaseObject', function($scope,$location, $firebaseAuth, $firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://reports1.firebaseio.com/");
    var refAddReports = ref.child('reports');
    var auth = $firebaseAuth(ref);
    var usersList = $firebaseArray(ref);
    var usersListO = $firebaseObject(ref);
    var getAuth = auth.$getAuth(); // auth user info
    if (getAuth === null){
        $location.path('/no_access')
    } else {
        $scope.events = {
            addNewProfile : function(){
                console.log('addNewProfile');
                Materialize.toast('На этапе разработки',3000, 'rounded')
            },
            addNewBider : function(){
                console.log('addNewBider');
                Materialize.toast('На этапе разработки',3000, 'rounded')
            },
            form : function(){
                $location.path('/admin');
            },
            logout : function(){
                ref.unauth();
                $location.path('/login');
            }
        };
        usersListO.$loaded()
            .then(function () {
                /*angular.forEach(usersList, function (usersList) {
                 console.log(usersList.users);
                 });*/
                var nameBid = usersListO.users[getAuth.uid];
                $scope.nameUser = nameBid.name;
                var userRole = nameBid.role;
                if (userRole === 'admin') {
                    $scope.linkForAdmin = '<li><a ng-click="events.form()" href="javascript:void(0)">Админ панель</a></li>';
                }
            });
        $scope.AddReprot = function () {
            var addFrom = $firebaseArray(refAddReports);

            var nameBider = $scope.nameUser;
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
            }).then(function (refAddReports) {
                Materialize.toast('Отчет отправлен, спасибо!',5000, 'rounded');
                console.log(refAddReports);
            }, function (error) {
                Materialize.toast('Отчет не отправлен!',5000, 'rounded');
                console.log("Error:", error);
            });

        };


        // init materialize plugin
        $(document).ready(function () {
            // init date picker
            $('.datepicker').pickadate({
                selectMonths: true,
                selectYears: 15
            });
            $('select').material_select();

        });
    }
}]);