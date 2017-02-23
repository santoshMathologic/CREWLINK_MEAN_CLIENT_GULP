(function () {


    var app = angular.module("crewMeanApp", []);
    app.factory("AuthFactory", function ($window) {

        return {

            isLoggedIn: false,
            isLoggedInCheck: function () {
                return this.checkLogin();
            },
            checkLogin: function () {
                if ($window.sessionStorage.token && $window.sessionStorage.user) {
                    this.isLoggedIn = true;
                }
                else {
                    this.isLoggedIn = false;
                    delete this.user;

                }
                return (this.isLoggedIn) ? true : false;

            }
        };
    });

    app.factory("UserAuthFactory", function ($state,$window, $cookies, $location, $http, AuthFactory) {
        return {
            login: function (username, password) {
                return $http.post("http://localhost:4000/api/v1/login", {
                    username: username,
                    password: password
                });
            },
            logout: function () {

                if (AuthFactory.isLogged) {

                    AuthFactory.isLogged = false;
                    delete AuthFactory.user;
                    delete AuthFactory.userRole;
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



})();