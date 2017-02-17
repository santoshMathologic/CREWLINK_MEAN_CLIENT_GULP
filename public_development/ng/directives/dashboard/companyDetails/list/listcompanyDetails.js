' use strict';

angular.module('crewMeanApp')
    .directive('companyDetailList', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/companyDetails/list/listcompanyDetails.tmpl.html',
            controller: function($scope, $state) {
                
            }

        };
    }]);