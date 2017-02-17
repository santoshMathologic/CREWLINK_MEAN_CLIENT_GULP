' use strict';

angular.module('crewMeanApp')
    .directive('companyDetails', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/companyDetails/create/companyDetails.tmpl.html',
            controller: function($scope, $state) {
                
            }

        };
    }]);