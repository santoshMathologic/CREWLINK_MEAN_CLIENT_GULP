(function (){

     ' use strict';
     angular.module('crewMeanApp')
    .directive('login', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login/login.tmpl.html',
            controller: function ($scope, $state, AuthenticationFactory, UserAuthFactory, $window, $location) {

                $scope.isLoggedIn = AuthenticationFactory.isLoggedIn();
                $scope.isError = false;
                $scope.login = function (username, password) {
                    if (username !== undefined && password !== undefined) {
                    UserAuthFactory.login(username, password).success(function (successResponse) {

                        if (successResponse.message==="UserName and Password Not Match") {
                       $scope.isError = true;
                        } else {
                            AuthenticationFactory.isLogged = true;
                            AuthenticationFactory.username = successResponse.userObject[0].userName;
                            AuthenticationFactory.userRole = successResponse.userObject[0].roleCode;
                            $window.sessionStorage.token = successResponse.token;
                            $window.sessionStorage.username = successResponse.userObject[0].userName; // to fetch the user details on refresh
                            $window.sessionStorage.userRole = successResponse.userObject[0].roleCode; // to fetch the user details on refresh
                            //$state.go("home.dashboard.commondashboard");
                            $location.path('/home/dashboard');

                        }


                    }).error(function (errorResponse) {

                        console.log("errorResponse" + errorResponse);


                    });

                }



                };

            }

        };
    }]);

})();

