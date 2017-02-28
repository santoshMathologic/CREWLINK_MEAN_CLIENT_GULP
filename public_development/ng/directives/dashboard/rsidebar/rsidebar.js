(function () {
    ' use strict';
    var app = angular.module('crewMeanApp');
    app.directive('rsidebar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/rSidebar/rsidebar.tmpl.html',
            replace: true,
            scope: {},
            controller: function ($scope, $state, $window, $location, UserService, $rootScope, $timeout) {

                $scope.names = ["choose color", "red", "green", "blue","vilot","orange","pink"];

                
    $scope.shared=  $scope.selectedName = $scope.names[0];
  $rootScope.$watch('shared',function(newValue){
  $scope.shared=$rootScope.shared;
});
             

              

            }

        };
    }]);

})();
