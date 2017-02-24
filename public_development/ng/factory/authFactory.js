(function () {

    ' use strict';
    var app = angular.module('crewMeanApp');
    app.factory('AuthenticationFactory', function ($window) {
        return {
            isLogged: false,
            isLoggedIn: function () {
                return this.checkLoggedInStatus();
            },
            checkLoggedInStatus: function () {
                if ($window.sessionStorage.token && $window.sessionStorage.username) {
                    this.isLogged = true;
                } else {
                    this.isLogged = false;
                    
                }
                return (this.isLogged) ? true : false;
            }
        };

    });

    app.factory('UserAuthFactory', function ($state, $window, $cookies, $location, $http, AuthenticationFactory) {
        return {
            login: function (username, password) {
                return $http.post('http://localhost:4000/api/v1/login', {
                    username: username,
                    password: password
                });
            },
            logout: function () {

                if (AuthenticationFactory.isLogged) {

                    AuthenticationFactory.isLogged = false;
                    delete AuthenticationFactory.username;
                    delete AuthenticationFactory.userRole;
                    delete $window.sessionStorage.userPlan;
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.username;
                    delete $window.sessionStorage.userRole;

                    $cookies = {};

                    //$state.go("login");
                }

            }
        }
    });

   

})();

