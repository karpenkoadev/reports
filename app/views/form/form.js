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
    var funcRepeatForm = false;
    if (getAuth === null){
        $location.path('/no_access')
    } else {
        $scope.events = {
            form : function(){
                $location.path('/admin');
            },
            changeEmail : function(){
                Materialize.toast('На этапе разработки',3000, 'rounded')
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
            var userUid = getAuth.uid;
            var userAuth = usersListO.users[userUid];
            var firstElemUser = Object.keys(userAuth);
                        firstElemUser.push('test');
                        console.log(firstElemUser[0]);
                        var userRole = userAuth[firstElemUser[0]].role;

                var nameBid = userAuth[firstElemUser[0]];

                    console.log(nameBid)
                $scope.profileUser = usersListO.profile;
                $scope.nameUser = nameBid.name;

                        

                var userRole = nameBid.role;

                if (userRole === 'admin') {
                    $scope.linkForAdmin = '<li><a ng-click="events.form()" href="javascript:void(0)">Админ панель</a></li>';
                }
            });
        // get time

        // send cont from form in firebase
        $scope.AddReprot = function () {
            var d = new Date();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var addFrom = $firebaseArray(refAddReports);
            var nameBider = $scope.nameUser;
            var dates = hours + ":" + minutes + " || " + $scope.reports1.datePik;
            var countBild = $scope.reports1.countBild;
            var profiles = $scope.reports1.profiles;
            var linkOnBid = $scope.reports1.linkOnBid;
            if ($scope.reports1.comments === undefined || $scope.reports1.comments === false){
                var comments = "Нет";
            } else {
                var comments = "Да";
            }
            addFrom.$add({
                nameBider: nameBider,
                dates: dates,
                countBild: countBild,
                profiles: profiles,
                linkOnBid: linkOnBid,
                comments: comments
            }).then(function (refAddReports) {
                Materialize.toast('Отчет отправлен, спасибо!',5000, 'rounded');
                document.getElementById('formAddRepo').reset();
                console.log(refAddReports);
            }, function (error) {
                Materialize.toast('Отчет не отправлен!',5000, 'rounded');
                console.log("Error:", error);
            });

        };

        // Change password
        $scope.changePasswordAlert = 'Заполни все поля';
        $scope.changePassword = function(){
            var userEmail = getAuth.password.email;
            ref.changePassword({
                email: userEmail,
                oldPassword: $scope.changePassword.oldPassword,
                newPassword: $scope.changePassword.newPassword
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            console.log('The specified user account password is incorrect.');
                            Materialize.toast('Данные не верны!',5000, 'rounded');
                            break;
                        case "INVALID_USER":
                            console.log('The specified user account does not exist.');
                            break;
                        default:
                            console.log('Error changing password: ' +  error);
                    }
                } else {
                    Materialize.toast('Пароль изменен, спасибо!',5000, 'rounded');
                }
            });
        };





        // init materialize plugin
        $scope.endRepeat = function() {
            if (funcRepeatForm == false){
                funcRepeatForm = true;
                // init date picker
                $('.datepicker').pickadate({
                    selectMonths: true,
                    selectYears: 15
                });
                $('select').material_select();
                $(".button-collapse").sideNav();
                $(".dropdown-button").dropdown();
                $('.modal-trigger').leanModal();
            }

        };

    }
}])
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    scope.$evalAsync(attr.onFinishRender);
                }
            }
        }
    });