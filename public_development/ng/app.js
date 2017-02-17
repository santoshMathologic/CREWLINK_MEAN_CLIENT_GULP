
' use strict';

var app  = angular.module("crewMeanApp",[

]);

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
 
            $httpProvider.defaults.withCredentials = true;

        $urlRouterProvider.otherwise('/home/dashboard');
        $stateProvider
            .state('home', {
                templateUrl: 'ng/directives/home/home.directive.html',
                url: '/home',
                resolve: {
                    loadMyDirectives: function($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/home/home.js'
                                ]
                            });
                    }
                }
            }).state('home.dashboard',
            {
                templateUrl: 'ng/directives/dashboard/dashboard.directive.html',
                url: '/dashboard',
                resolve: {
                    loadMyDirectives: function($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/dashboard.js',
                                    

                                ]
                            });
                    }
                }
            });


}]);