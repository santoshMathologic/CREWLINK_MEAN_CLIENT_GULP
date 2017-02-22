angular.module('crewMeanApp')
    .directive('commondashboard', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl:  "ng/directives/dashboard/commondashboard/commondashboard.tmpl.html",
            controller: function($scope, $state, $window, $location,UserService) {
              
               String.prototype.replaceAll = function(find, replace) {
                     var str = this;
                     return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                 };
            	$scope.string = $state.current.name;
            	$scope.title = $scope.string.replaceAll('.', ' > ');
            	$scope.headertitle = $scope.title.split('>');
                UserService.config.sidebarTrigger = true;
            }

        };
    }]);