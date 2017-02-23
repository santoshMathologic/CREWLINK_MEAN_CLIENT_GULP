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
                    delete this.username;
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
                    delete AuthenticationFactory.user;
                    delete AuthenticationFactory.userRole;
                    delete $window.sessionStorage.userPlan;
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    delete $window.sessionStorage.userRole;

                    $cookies = {};

                    $state.go("home.login");
                }

            }
        }
    });

    app.factory('TokenInterceptor', function ($q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers['X-Access-Token'] = $window.sessionStorage.token;
                    config.headers['X-Key'] = $window.sessionStorage.userame;
                    config.headers['Content-Type'] = config.headers['Content-Type'] || "application/json";
                }
                return config || $q.when(config);
            },

            response: function (response) {
                return response || $q.when(response);
            }
        };
    });

})();

