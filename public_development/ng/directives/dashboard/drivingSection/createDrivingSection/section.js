angular.module('crewMeanApp')
    .directive('createSection', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/drivingSection/createDrivingSection/section.tmpl.html',
            controller: function($scope, $q, $state, $timeout, $compile, $window, $location, $http) {
                console.log("Inside the Create Section");
                String.prototype.replaceAll = function(find, replace) {
                    var str = this;
                    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                };
                $scope.simulateQuery = false;
                $scope.string = $state.current.name;
                $scope.string = $scope.string.replaceAll('.', ' > ');
                $scope.$parent.title = $scope.string;
                var self = this;

                $scope.trainStations = [];
                $scope.trainStationsList = [];
                $scope.query = {
                    limit: 1000,
                    trainNo: "",
                    sectionType: "all"
                }
                $scope.query.trainNo = ($state.params.trainNo) ? $state.params.trainNo : "";
                $scope.trainNo = {
                    options: {
                        debounce: 200
                    }
                }
                // $scope.$watch('query', function(newValue, oldValue) {
                //     if (newValue != oldValue) {
                //         $scope.getStations();
                //     }
                // });

                $scope.getStations = function() {
                    $scope.trainStations = [];
                    if ($scope.query.trainNo !== undefined && $scope.query.trainNo !== '') {
                        $http.get(apiGetTrainStations, { params: $scope.query })
                            .then(function(response) {
                                $scope.trainStations = response.data.results;
                                if ($scope.trainStations.length == 0) {
                                    

                                    
                                } else {
                                    $scope.changeStations = { stations: [], locoTypes: [] };
                                    $http.get(apiGetPlanSections, { params: $scope.query })
                                        .then(function(response) {
                                            var data = response.data.results;
                                            if (data[0].userPlanId != null) {
                                                $scope.isPlanSection = true;
                                            } else {
                                                $scope.isPlanSection = false;
                                            }
                                            for (var i = 0; i < data.length; i++) {
                                                if ($scope.changeStations.stations.indexOf(data[i].fromStation) == -1) {
                                                    $scope.changeStations.stations.push(data[i].fromStation);
                                                    $scope.changeStations.locoTypes.push(data[i].locoType);
                                                }
                                            }
                                            $scope.updateIsLocoChange();
                                        });
                                }
                            });
                    }
                }

                /**
                 * Function to update is loco change
                 */
                $scope.updateIsLocoChange = function() {
                    if ($scope.changeStations.stations.length > 0) {
                        $scope.trainStations[0].isLocoChange = true;
                        $scope.trainStations[$scope.trainStations.length - 1].isLocoChange = true;
                        var index;
                        for (var i = 1; i < $scope.trainStations.length - 1; i++) {
                            index = $scope.changeStations.stations.indexOf($scope.trainStations[i].stationCode);
                            if (index != -1) {
                                if ($scope.isPlanSection)
                                    $scope.trainStations[i].isPlanSection = true;
                                $scope.trainStations[i].isLocoChange = true;
                                $scope.trainStations[i].locoType = $scope.changeStations.locoTypes[index];
                            }
                            else
                                $scope.trainStations[i].locoType = "";
                        }
                    }
                    $scope.trainStationsList = $scope.trainStations
                }

                $scope.getStations();
                $scope.responseData = [];
                function loadAll() {
                    var repos = $scope.responseData;
                    console.log(repos);
                    return repos.map(function(repo) {
                        repo.value = repo.name.toLowerCase();
                        return repo;
                    });
                }
                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(item) {
                        return (item.value.indexOf(lowercaseQuery) === 0);
                    };
                }

                $scope.querySearch = function(query) {
                    var results = [];
                    $scope.simulateQuery = true
                    deferred = $q.defer();
                    if ($scope.simulateQuery) {
                        $scope.query.trainNo = query;                     
                        $http.get(apiUrl + '/' + 'trainList', { params: $scope.query }).then(function(response) {
                            $scope.responseData = response.data.results;
                            deferred.resolve($scope.responseData);
                        });

                        return deferred.promise;
                    } else {
                        return results;
                    }
                }
                $scope.searchTextChange = function(text) {
                }
                $scope.selectedItemChange = function(item) {
                    if (item != undefined) {
                        console.log('Item changed to ' + JSON.stringify(item.trainNo));
                        $scope.query.trainNo = item.trainNo;
                        $scope.getStations();
                    }
                }
            }
        };
    }]);