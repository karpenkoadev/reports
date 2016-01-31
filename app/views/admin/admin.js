angular.module('myApp.admin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/admin',{
        templateUrl:'views/admin/admin.html',
        controller:'adminCtr'
    })
}])
    .controller('adminCtr', ['$scope', '$location', '$firebaseArray', '$firebaseAuth', '$firebaseObject','$http', function($scope, $location, $firebaseArray, $firebaseAuth, $firebaseObject, $http){
        var ref = new Firebase("https://reports1.firebaseio.com");
        var auth = $firebaseAuth(ref);
        var profileFirbase = ref.child('profile');
        var usersFirbase = ref.child('users');
        var getAuth = auth.$getAuth();
        if (getAuth === null){
            $location.path('/no_access')
        } else {
            var funcRepeat = false;
            $scope.endRepeatAdmin = function() {
                if (funcRepeat == false){
                    funcRepeat = true;
                    console.log(1111);
                    $('.modal-trigger').leanModal();
                    $(".dropdown-button").dropdown();
                    // $('ul.tabs').tabs('select_tab', 'myself');
                    $('ul.tabs').tabs();
                }
            };
            var userUid = getAuth.uid;
            var fireObj = $firebaseObject(ref);
            //menu
            $scope.events = {
                addNewProfile : function(){
                    Materialize.toast('На этапе разработки',3000, 'rounded')
                },
                addNewBider : function(){
                    Materialize.toast('На этапе разработки',3000, 'rounded')
                },
                changeEmail : function(){
                    Materialize.toast('На этапе разработки',3000, 'rounded')
                },
                form : function(){
                    $location.path('/form');
                },
                logout : function(){
                    ref.unauth();
                    $location.path('/login');
                }
            };
            //Get content from firebase
            fireObj.$loaded()
                .then(function() {
                    // check role user

                    var userAuth = fireObj.users[userUid];
                    var firstElemUser = Object.keys(userAuth);
                    firstElemUser.push('test');
                    console.log(firstElemUser[0]);
                    var userRole = userAuth[firstElemUser[0]].role;

                    //var userRole = userAuth.role;


                    if (userRole === "admin"){
                        console.log('admin')
                    } else if (userRole === "bider") {
                        console.log('bider');
                        $location.path('/form')
                    } else{
                        $location.path('/no_access')
                    }
                    // get data reports
                    var reportsObj = fireObj.reports;
                    $scope.reportsObj = reportsObj;
                    $scope.modal = 'id="modal';
                    angular.forEach(reportsObj, function (reportsObj) {
                       // console.log(reportsObj);
                        $scope.reportsObjDates = reportsObj.dates;

                    });
                    //$scope.reportsObj = fireObj.reports;
                    //console.log($scope.reportsObj);
                });

            // Change password myself
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
            //change password user
            $scope.changePasswordBider = function(){
                var userEmail = getAuth.password.email;
                ref.changePassword({
                    email: $scope.changePassword.email,
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
                                Materialize.toast('Пользователь не найден',5000, 'rounded');
                                break;
                            default:
                                console.log('Error changing password: ' +  error);
                        }
                    } else {
                        Materialize.toast('Пароль изменен, спасибо!',5000, 'rounded');
                    }
                });
            };

            // add new profile
            //change password user
            $scope.addNewProfile = function(){
                var addProfile = $firebaseArray(profileFirbase);
                var profilePhoto =  $scope.addProfile.profilePhoto;
                var profileName =  $scope.addProfile.name;
                addProfile.$add({
                    name: profileName,
                    img: profilePhoto
                }).then(function (refAddReports) {
                    Materialize.toast('Профиль добавлен, спасибо!',5000, 'rounded');
                    console.log(refAddReports);
                }, function (error) {
                    Materialize.toast('Профиль не добавлен!',5000, 'rounded');
                    console.log("Error:", error);
                });
            };
            $scope.AddBider = function(){
                var emailAddProf = $scope.AddBider.emailBid;
                var nameAddProf =  $scope.AddBider.nameLastName;
                var passwordAddProf =  $scope.AddBider.passwordBid;
                ref.createUser({
                    email: emailAddProf,
                    password: passwordAddProf
                }, function(error, userData) {
                    if (error) {
                        switch (error.code) {
                            case "EMAIL_TAKEN":
                                console.log("The new user account cannot be created because the email is already in use.");
                                break;
                            case "INVALID_EMAIL":
                                console.log("The specified email is not a valid email.");
                                break;
                            default:
                                console.log("Error creating user:", error);
                        }
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                        var usersFirbaseq = ref.child('users').child(userData.uid);
                        var addUser = $firebaseArray(usersFirbaseq);
                        addUser.$add({
                            name: nameAddProf,
                            emai: emailAddProf,
                            role: 'bider'
                        }).then(function (refAddReports) {
                            Materialize.toast('Бидер добавлен, спасибо!',5000, 'rounded');
                            console.log(refAddReports);
                        }, function (error) {
                            Materialize.toast('Бидер не добавлен!',5000, 'rounded');
                            console.log("Error:", error);
                        });
                    }
                });
            };
            $(".button-collapse").sideNav();

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
