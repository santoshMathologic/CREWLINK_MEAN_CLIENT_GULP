' use strict';

angular.module('crewMeanApp')
    .directive('userPlan', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/UserPlan/userPlan.tmpl.html',
            controller: function ($scope, $state, $http) {

                $scope.crewTypeList = [];
                $scope.query = {
                    limit:10,
                    page:1,
                    sortBy:'name'
                };

                $http.get(crewTypeUri,{params:$scope.query}).then(function successResponse(response) {

                    $scope.crewTypeList     = response.data.results;
                    $scope.currentPage      = response.data.current;
                    $scope.perPage          = response.data.options.perPage;
                    $scope.totalPages       = response.data.last;
                    $scope.totalRecords     = response.data.count;

                }, function errorResponse(response) {


                });
            }

        };
    }]);