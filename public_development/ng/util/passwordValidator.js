' use strict';
angular.module('walkinApp').directive('passwordMatch', ['$location', '$q', '$timeout', function ($location, $q, $timeout) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: true,
        link: function (scope, elements, attributes, control) {

            var checker = function () {
                var e1 = scope.$eval(attributes.ngModel);
                var e2 = scope.$eval(attributes.passwordMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                control.$setValidity("unique", n);
            });


        }


    }
}]);