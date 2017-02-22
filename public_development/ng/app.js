

(function (){


' use strict';

var api = {
    protocol: 'http',
    server: 'localhost',
    port: 4000,
    baseUrl: '/api/v1',
    crewTypeUrl: '/crewTypes',
    userPlans: '/userPlans',
};

var apiUrl = api.protocol + "://" + api.server + ":" + api.port + api.baseUrl;
var crewTypeUri = apiUrl + api.crewTypeUrl;
var userPlansUri = apiUrl + api.userPlans;

var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');

var app = angular.module("crewMeanApp", [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngSanitize',
    'smart-table',
    'toaster',
    'ngAnimate',
    'ngCookies',
    'base64',
    'angucomplete-alt',
    'AxelSoft',
    'flow',
    'ngRoute',
    'toggle-switch',
    'ngProgress',
    'uiSwitch'
]).config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {

       // $urlRouterProvider.otherwise('/home/dashboard');
        $urlRouterProvider.otherwise('/login');
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
                            }), $ocLazyLoad.load(
                                {
                                    name: 'toggle-switch',
                                    files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngAnimate',
                                    files: ['bower_components/angular-animate/angular-animate.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngCookies',
                                    files: ['bower_components/angular-cookies/angular-cookies.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngResource',
                                    files: ['bower_components/angular-resource/angular-resource.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngSanitize',
                                    files: ['bower_components/angular-sanitize/angular-sanitize.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngTouch',
                                    files: ['bower_components/angular-touch/angular-touch.js']
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
                                    'ng/directives/dashboard/state/state.js',
                                    'ng/util/serverTableFetch.js',
                                    'ng/util/UserService.js',
                                    'ng/util/stRatio.js'

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
                controller:"userCtrl",

                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/User/user.js',
                                    'ng/controller/user.js'

                                ]
                            });
                    }
                }
            }).state('home.dashboard.userPlan',
            {
                templateUrl: 'ng/directives/dashboard/UserPlan/userPlan.directive.html',
                url: '/userPlan',
                 controller:"userplanCtrl",
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/UserPlan/userPlan.js',
                                    'ng/controller/userPlan.js'

                                ]
                            });
                    }
                }
            }).state('home.dashboard.register',
            {
                templateUrl: 'ng/directives/dashboard/register/register.directive.html',
                url: '/register',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/register/register.js'

                                ]
                            });
                    }
                }
            })
           .state('login',
            {
                templateUrl: 'ng/directives/login/login.directive.html',
                url: '/login',
                controller: 'LoginCtrl',
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
            }).state('home.dashboard.upload',{
        templateUrl:'ng/directives/dashboard/upload/upload.directive.html',
        //controller: 'uploadCtrl',
        url:'/upload',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'crewMeanApp',
                files:[
                       "ng/directives/dashboard/upload/upload.js",
                       //"ng/controllers/upload.js"
                       
                ]
              });
            }
          }
    }).state('home.dashboard.commondashboard',{
        templateUrl:'ng/directives/dashboard/commondashboard/commondashboard.directive.html',
        url:'/commondsboard',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'crewMeanApp',
                files:[
                       "ng/directives/dashboard/commondashboard/commondashboard.js",
                       'ng/directives/dashboard/state/state.js'

                       
                ]
              });
            }
          }
    	}) .state('home.dashboard.createCompany',
            {
                templateUrl: 'ng/directives/dashboard/company/create/company.directive.html',
                url: '/createCompany',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/company/create/company.js'

                                ]
                            });
                    }
                }
            }) .state('home.dashboard.listcompany',
            {
                templateUrl: 'ng/directives/dashboard/company/list/listcompany.directive.html',
                url: '/listcompany',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'crewMeanApp',
                                files: [
                                    'ng/directives/dashboard/company/list/listcompany.js'

                                ]
                            });
                    }
                }
            });
    


    }]);

})();