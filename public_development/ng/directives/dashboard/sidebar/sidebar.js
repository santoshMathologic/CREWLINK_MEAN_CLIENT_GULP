' use strict';

angular.module('crewMeanApp')
    .directive('sidebar', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/sidebar/sidebar.tmpl.html',
            controller: function($scope, $state, $window, $location) {

                
            	$scope.button_clicked = false;
            	
            	$scope.hideSidebar = function(){
            		$scope.button_clicked = true;
            		console.log($scope.button_clicked);
            		$scope.disableSidebar();
            		return false;
                
                	
                };
                
                $scope.showSideBar  = function(){
                	$scope.enableSidebar(); 
                };
                	
            	$scope.disableSidebar = function()
            	{
            		 $scope.tooltipMessage = 'Show Sidebar!';
               		 angular.element(document.querySelector('[id="page-content"]')).addClass('page-content-no-margin animate-hide');
               		 angular.element(document.querySelector('[id="righttogglebutton"]')).addClass('glyphicon-chevron-right hide-toggle-button');
               		angular.element(document.querySelector('[id="lefttogglebutton"]')).addClass('glyphicon-chevron-right hide-toggle-button-right');
               		 angular.element(document.querySelector('[id="rightSideBar"]')).addClass('hide-right-sidebar animate-hide');
            	};
            	
            	$scope.enableSidebar = function()
            	{
            		 $scope.tooltipMessage = 'Hide Sidebar!';
               		 angular.element(document.querySelector('[id="page-content"]')).removeClass('page-content-no-margin');
               		 angular.element(document.querySelector('[id="togglebutton"]')).removeClass('glyphicon-chevron-right hide-toggle-button').addClass('glyphicon-chevron-left');
               		 angular.element(document.querySelector('[id="rightSideBar"]')).removeClass('hide-right-sidebar');
               	};
              
                
            }

        };
    }]);