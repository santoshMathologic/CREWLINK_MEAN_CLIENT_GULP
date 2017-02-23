' use strict';

angular.module('crewMeanApp')
    .directive('header', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/header/header.tmpl.html',
            controller: function($scope, $state,$location,$rootScope) {
$scope.choosecolor = "green";
     $scope.chooseColor  = function(){

$scope.shared =  $scope.choosecolor;
                $scope.$watch('shared', function (newValue) {
                    $rootScope.shared = $scope.shared;
                });
     }

       

                $scope.logout = function(){
                    $location.path("/login");

                };
                
            }

        };
    }]);