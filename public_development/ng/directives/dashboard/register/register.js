' use strict';

angular.module('crewMeanApp')
    .directive('register', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/register/register.tmpl.html',
            controller: function ($scope, $state, $http) {

               
            }

        };
    }]);