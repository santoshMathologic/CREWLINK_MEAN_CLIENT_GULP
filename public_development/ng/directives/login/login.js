angular.module('crewMeanApp')
    .directive('login', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login/login.tmpl.html',
            controller: function($scope,$state,AuthFactory) {

                $scope.login = function(username,password){

              AuthFactory.login(username,password).success(function(res) {
                 

                 

                 $state.go("home.dashboard.commondashboard");


                }).error(function(res) {

               
                });

            };
                
            }

        };
    }]);