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


                $scope.$watch('UserService.config.sidebarTrigger', function (newVal) {

                    if (!newVal)
                        disableSidebar();
                    else
                        enableSidebar();
                    $scope.hideSidebarVar = !newVal;
                }.bind(this), true);


                $scope.hideSidebar = function () {
                    $scope.hideSidebarVar = ($scope.hideSidebarVar) ? false : true;
                    UserService.config.sidebarTrigger = !$scope.hideSidebarVar;


                };

                var disableSidebar = function () {

                    $scope.tooltipMessage = 'Show Sidebar!';
                    angular.element(document.querySelector('[id="page-content"]')).addClass('page-content-no-margin animate-hide');
                    angular.element(document.querySelector('[id="righttogglebutton"]')).addClass('glyphicon-chevron-right hide-toggle-button');
                    angular.element(document.querySelector('[id="lefttogglebutton"]')).addClass('glyphicon-chevron-right hide-toggle-button-right');
                    angular.element(document.querySelector('[id="rightSideBar"]')).addClass('hide-right-sidebar animate-hide');
                };

                var enableSidebar = function () {


                    $scope.tooltipMessage = 'Hide Sidebar!';
                    angular.element(document.querySelector('[id="page-content"]')).removeClass('page-content-no-margin');
                    angular.element(document.querySelector('[id="togglebutton"]')).removeClass('glyphicon-chevron-right hide-toggle-button').addClass('glyphicon-chevron-left');
                    angular.element(document.querySelector('[id="rightSideBar"]')).removeClass('hide-right-sidebar');
                };


            }

        };
    }]);

})();
