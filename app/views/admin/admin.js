angular.module('myApp.admin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/admin',{
        templateUrl:'views/admin/admin.html',
        controller:'adminCtr'
    })
}])
    .controller('adminCtr', ['$scope', '$location', '$firebaseArray', '$firebaseAuth', '$firebaseObject', function($scope, $location, $firebaseArray, $firebaseAuth, $firebaseObject){
        var ref = new Firebase("https://reports1.firebaseio.com");
        var auth = $firebaseAuth(ref);
        var getAuth = auth.$getAuth();
        if (getAuth === null){
            $location.path('/no_access')
        } else {
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
                    var userRole = userAuth.role;
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
                        console.log(reportsObj);
                        $scope.reportsObjDates = reportsObj.dates;

                    });
                    //$scope.reportsObj = fireObj.reports;

                    //console.log($scope.reportsObj)
                });
            $scope.endRepeat = function() {
                setTimeout($('.modal-trigger').leanModal(),1000)
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
