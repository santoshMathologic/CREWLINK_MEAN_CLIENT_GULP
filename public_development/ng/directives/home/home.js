angular.module('crewMeanApp')
    .directive('home', ['$compile', function($compile) {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: 'ng/directives/home/home.tmpl.html',
            controller: function($scope,UserService) {
                
                UserService.config.sidebarTrigger = false;
                
            }

        };
    }]);