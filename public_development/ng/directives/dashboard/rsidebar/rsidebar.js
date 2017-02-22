(function () {
    ' use strict';
    var app = angular.module('crewMeanApp');
    app.directive('rsidebar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/rSidebar/rsidebar.tmpl.html',
            replace: true,
            scope: {},
            controller: function ($scope, $state, $window, $location, UserService, $timeout) {
                


            }

        };
    }]);

})();
