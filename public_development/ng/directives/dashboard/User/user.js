' use strict';

angular.module('crewMeanApp')
    .directive('user', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/User/user.tmpl.html',
            controller: function ($scope, $state, $http) {

               
            }

        };
    }]);