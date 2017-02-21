(function () {


    ' use strict';

    angular.module('crewMeanApp')
        .directive('sidebar', ['$compile', function ($compile) {
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
                            $scope.disableSidebar();
                        else
                            $scope.enableSidebar();
                        $scope.hideSidebarVar = !newVal;
                    }.bind(this), true);


                    $scope.hideSidebar = function () {

                        $scope.hideSidebarVar = ($scope.hideSidebarVar) ? false : true;
                        UserService.config.sidebarTrigger = !$scope.hideSidebarVar;
                        console.log("sidebar");

                    };


                    $scope.disableSidebar = function () {

                        console.log("disable Sidebar");

                    };

                    $scope.enableSidebar = function () {
                        console.log("enable Sidebar");
                    }


                }

            };
        }]);

})();
