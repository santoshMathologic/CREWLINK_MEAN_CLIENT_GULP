
' use strict';

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
                                    'ng/directives/dashboard/blank/blank/blank.js'

                                ]
                            });
                    }
                }
            });


    }]);
