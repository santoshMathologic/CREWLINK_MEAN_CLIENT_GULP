angular.module('crewMeanApp')
    .directive('trains', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/trains/trains.tmpl.html',
            controller: function($scope, $state, $http, $log, $q, $timeout, $window, $location) {
                String.prototype.replaceAll = function(find, replace) {
                    var str = this;
                    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                };

                $scope.Days = Days;
                $scope.totalPages = 1;
                $scope.totalRecords = 0;
                $scope.string = $state.current.name;
                $scope.string = $scope.string.replaceAll('.', ' > ');
                $scope.$parent.title = $scope.string;
                $scope.trainsList = [];
                $scope.order = 'trainNo';
                $scope.trainNo = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.trainName = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.fromStation = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.toStation = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.passingStation1 = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.passingStation2 = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.trainTypes = trainTypes;
                
                $scope.query = {
                    order: 'trainNo',
                    limit: 10,
                    page: 1,
                    trainNo: '',
                    trainName: '',
                    fromStation: '',
                    toStation: '',
                    trainType: '',
                    
                };
                $scope.selected = [];
                function success(trainsList) {
                    $scope.trainsList = trainsList;
                }
                $scope.currentPage = 1;
               

                $scope.$watch('query', function(newValue, oldValue) {
                    if (!oldValue) {
                        bookmark = $scope.query.page;
                    }

                    if (newValue !== oldValue) {
                        $scope.query.page = newValue.page;
                    }

                    if (!newValue) {
                        $scope.query.page = bookmark;
                    }

                    $scope.getTrainsList();
                }, true);


                /**
                 * Function to get all trains from database
                 */
               $scope.getTrainsList =  function () {
                    $http.get("http://localhost:4000/api/v1/trainList", { params: $scope.query })
                        .then(function(response) {
                            $scope.trainsList = response.data.results;
                            $scope.currentPage = response.data.current;
                            $scope.perPage = response.data.options.perPage;
                            $scope.totalPages = response.data.last;
                            $scope.totalRecords = response.data.count;
                        });
                };
                $scope.getTrainsList();

                /**
                 * Function for navigate to trains time table
                 */
                $scope.goToTrainsTimeTable = function(params) {
                    $state.go("home.dashboard.trainTimeTable", params);
                };
            }
        };
    }]);