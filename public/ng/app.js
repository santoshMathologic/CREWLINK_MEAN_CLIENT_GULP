
' use strict';

var api = {
     protocol: 'http',
    server: 'localhost',
    port: 4000,
    baseUrl: '/api/v1',
    crewTypeUrl: '/crewTypes',
};

var apiUrl = api.protocol + "://" + api.server + ":"+ api.port + api.baseUrl;
var crewTypeUri = apiUrl + api.crewTypeUrl;

var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');

var app = angular.module("crewMeanApp", [
    'oc.lazyLoad',
    'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/home/dashboard');
        $stateProvider
            .state('home', {
                templateUrl: 'ng/directives/home/home.directive.html',
                url: '/home',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
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
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/dashboard.js',
                                    'ng/directives/dashboard/header/header.js',
                                    'ng/directives/dashboard/sidebar/sidebar.js',

                                ]
                            });
                    }
                }
            }).state('home.dashboard.blank',
            {
                templateUrl: 'ng/directives/dashboard/blank/blank.directive.html',
                url: '/blank',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/blank/blank.js'

                                ]
                            });
                    }
                }
            }).state('home.dashboard.user',
            {
                templateUrl: 'ng/directives/dashboard/User/user.directive.html',
                url: '/user',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/User/user.js'

                                ]
                            });
                    }
                }
            }).state('home.dashboard.userPlan',
            {
                templateUrl: 'ng/directives/dashboard/UserPlan/userPlan.directive.html',
                url: '/user',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/User/user.js'

                                ]
                            });
                    }
                }
            }).state('home.login',
            {
                templateUrl: 'ng/directives/login/login.directive.html',
                url: '/login',
                controller:'LoginCtrl',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/login/login.js',
                                     'ng/controller/login.js'

                                ]
                            });
                    }
                }
            });


    }]);
