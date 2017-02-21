(function () {
    ' use strict';
var app = angular.module('crewMeanApp');
        app.directive('sidebar', ['$compile', function ($compile) {
            return {
                restrict: 'E',
                templateUrl: 'ng/directives/dashboard/sidebar/sidebar.tmpl.html',
                replace: true,
                scope: {},
                controller: function ($scope, $state, $window, $location, UserService) {
                    $scope.UserService = UserService;
                    $scope.hideSidebarVar = false;

                   
                    $scope.$watch(function () {
                        return UserService.config.sidebarTrigger;
                    }, function (newVal) {

                        if (!newVal)
                            disableSidebar();
                        else
                            enableSidebar();
                        $scope.hideSidebarVar = !newVal;
                    }.bind(this), true);


                    $scope.hideSidebar = function() {
                        $scope.hideSidebarVar = ($scope.hideSidebarVar) ? false : true;
                        UserService.config.sidebarTrigger = !$scope.hideSidebarVar;
                        console.log("sidebar");

                    };

                    var disableSidebar = function () {
                        console.log("disable Sidebar");
                    };

                    var enableSidebar = function () {
                        console.log("enable Sidebar");
                    };


                }

            };
        }]);

})();
