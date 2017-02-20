(function() {
	'use strict';
angular.module('crewMeanApp').directive('sidebarDirective', ['$compile', function($compile) {
	return {
		link : function(scope, element, attr) {
			scope.$watch(attr.sidebarDirective, function(newVal) {
				if (newVal) {
						
					angular.element(document.querySelector('[id="rightSideBar"]')).addClass('show');
					scope.tooltipMessage = 'Show Sidebar!';
					
					angular.element(document.querySelector('[id="righttogglebutton"]')).addClass('sidebar_Toggle_Button');
					angular.element(document.querySelector('[id="righttogglebutton"]')).addClass('glyphicon-chevron-right');
					
					angular.element(document.querySelector('[id="page-content"]')).addClass('page-content-no-margin animate-hide');
					return;
				}else{
				scope.tooltipMessage = 'Hide Sidebar!';
				angular.element(document.querySelector('[id="rightSideBar"]')).removeClass('show');
				angular.element(document.querySelector('[id="righttogglebutton"]')).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
				angular.element(document.querySelector('[id="righttogglebutton"]')).removeClass('sidebar_Toggle_Button');
				angular.element(document.querySelector('[id="page-content"]')).removeClass('page-content-no-margin');
				}
				
			});
		},
		controller : function sideBarController($scope) {

			$scope.state = false;
			$scope.tooltipMessage = 'Show Sidebar!';

			$scope.toggleState = function() {
				$scope.state = !$scope.state;
			};

		}
	};
}]);

})();
