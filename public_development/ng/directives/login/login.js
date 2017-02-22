angular.module('crewMeanApp')
    .directive('login', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login/login.tmpl.html',
            controller: function($scope,$state) {

                $scope.login = function(username,password){

                 console.log(username);
                 console.log(password);

                 $state.go("home.dashboard.commondashboard");


                };
                
                
            }

        };
    }]);