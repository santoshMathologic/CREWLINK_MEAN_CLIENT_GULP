' use strict';

angular.module('crewMeanApp')
    .directive('sidebar', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/sidebar/sidebar.tmpl.html',
            controller: function($scope, $state, $window, $location) {

             
                
            }

        };
    }]);