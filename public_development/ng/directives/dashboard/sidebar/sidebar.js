(function () {
    ' use strict';
    var app = angular.module('crewMeanApp');
    app.directive('sidebar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/sidebar/sidebar.tmpl.html',
            replace: true,
            scope: {},
            controller: function ($scope, $state, $window, $location, UserService, $timeout) {
                $scope.UserService = UserService;
                $scope.hideSidebarVar = false;
                UserService.config.sidebarTrigger = false;

                $scope.$watch('UserService.config.sidebarTrigger', function (newVal) {

                    if (newVal)

                        hideSideBar();
                    else
                        showSideBar();

                    $scope.hideSidebarVar = newVal;
                }, true);


                $scope.hideSidebar = function () {
                    $scope.hideSidebarVar = ($scope.hideSidebarVar) ? false : true;
                    UserService.config.sidebarTrigger = $scope.hideSidebarVar;


                };

                var hideSideBar = function () {
                    $scope.tooltipMessage = 'Show Sidebar!';

                    angular.element(document.querySelector('[id="mainContent"]')).addClass('page-content-no-margin animate-hide');
                    angular.element(document.querySelector('[id="toggleButton"]')).addClass('fa fa-chevron-right');
                    angular.element(document.querySelector('[id="rightSideBar"]')).addClass('leftSideBar_hide animate-hide');
                };

                var showSideBar = function () {


                    $scope.tooltipMessage = 'Hide Sidebar!';
                    angular.element(document.querySelector('[id="mainContent"]')).removeClass('page-content-no-margin');
                    angular.element(document.querySelector('[id="toggleButton"]')).removeClass('fa fa-chevron-right').addClass('fa fa-chevron-left');

                    $timeout(function () {
                        angular.element(document.querySelector('[id="rightSideBar"]')).removeClass('leftSideBar_hide').addClass("animate-hide");
                    }, 150);


                };


            }

        };
    }]);

})();
