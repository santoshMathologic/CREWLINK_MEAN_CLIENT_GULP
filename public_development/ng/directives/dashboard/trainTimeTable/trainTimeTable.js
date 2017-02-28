angular.module('crewMeanApp')
    .directive('trainTimeTable', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/trainTimeTable/trainTimeTable.tmpl.html',
            controller: function ($scope, $state, $window, $http, $location) {
                
                String.prototype.replaceAll = function (find, replace) {
                    var str = this;
                    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                };
                $scope.string = $state.current.name;
                $scope.string = $scope.string.replaceAll('.', ' > ');
                $scope.$parent.title = $scope.string;

                $scope.query = {
                    order: 'stopNo',
                    limit: 100,
                    page: 1,
                    trainNo: "",
                    stationCode: "",
                    stopNo: "",
                    departureTime: "",
                    arrivalTime: "",
                    dayOfJourney: "",
                    distance: "",
                    locoType: "",
                    isLocoChange: ""
                };
                $scope.query.trainNo = ($state.params.trainNo) ? $state.params.trainNo : "";
                $scope.day = ($state.params.day) ? $state.params.day : "all";
                $scope.changeStations = [];
                $scope.query1 = {
                    trainNo: $scope.query.trainNo,
                    limit: 1000
                };
               
                $scope.getTrainsDetails = function () {
                    if ($scope.query.trainNo !== "") {
                        $http.get('http://localhost:4000/api/v1/trainList', { params: $scope.query1 })
                            .then(function (response) {
                                $scope.trainRunningDays = response.data.results[0].runningDays;
                            });
                    }
                }
                $scope.getTrainsDetails();
                $scope.Days = Days;
                $scope.totalPages = 1;
                $scope.totalRecords = 0;

                $scope.stations = [];

                $scope.train = {
                    trainNo: {
                        options: {
                            debounce: 1000
                        }
                    },
                    day: {
                        options: {
                            debounce: 500
                        }
                    }
                }
                $scope.stationCode = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.stopNo = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.departureTime = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.arrivalTime = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.dayOfJourney = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.distance = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.locoType = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.isLocoChange = {
                    options: {
                        debounce: 500
                    }
                };

                $scope.currentPage = 1;
                

                $scope.$watch('query', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.getStations();
                    }
                }, true);

                $scope.$watch('query.trainNo', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.getTrainsDetails();
                    }
                }, true);

                $scope.$watch('day', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.updateDays();
                    }
                }, true);


                /**
                 * Function to get all stations of train from database
                 */
                $scope.getStations = function () {
                    if ($scope.query.trainNo !== "") {
                        $http.get("http://localhost:4000/api/v1/trainStations", { params: $scope.query })
                            .then(function (response) {
                                $scope.stations = response.data.results;
                                $scope.globalStations = JSON.parse(JSON.stringify($scope.stations));
                                $scope.updateDays();
                                $scope.currentPage = response.data.current;
                                $scope.perPage = response.data.options.perPage;
                                $scope.totalPages = response.data.last;
                                $scope.totalRecords = response.data.count;

                                $scope.changeStations = [];
                                $http.get("http://localhost:4000/api/vi/globalSections", { params: $scope.query1 })
                                    .then(function (response) {
                                        var data = response.data.results;
                                        for (var i = 0; i < data.length; i++) {
                                            if($scope.changeStations.indexOf(data[i].fromStation) == -1)
                                                $scope.changeStations.push(data[i].fromStation);
                                            if($scope.changeStations.indexOf(data[i].toStation) == -1)
                                                $scope.changeStations.push(data[i].toStation);
                                        }
                                        $scope.updateIsLocoChange();
                                    });
                            });
                    }
                };
                
                $scope.getStations();

                $scope.updateDays = function () {
                    if ($scope.trainRunningDays.indexOf(parseInt($scope.day)) == -1 && $scope.day != 'all')
                        $scope.day = 'all';
                    if ($scope.day != 'all' && $scope.day !== '') {
                        var day;
                        for (var i = 0; i < $scope.stations.length; i++) {
                            day = $scope.globalStations[i].departureDay + parseInt($scope.day);
                            $scope.stations[i].departureDay = (day > 6) ? day - 7 : day;
                            day = $scope.globalStations[i].arrivalDay + parseInt($scope.day);
                            $scope.stations[i].arrivalDay = (day > 6) ? day - 7 : day;
                        }
                    }
                };
                
                $scope.updateIsLocoChange = function (){
                    if ($scope.changeStations.length > 0){
                        for (var i = 0; i < $scope.stations.length; i++) {
                            if($scope.changeStations.indexOf($scope.stations[i].stationCode) != -1){
                                $scope.stations[i].isLocoChange = true;
                            }
                        }
                    }
                };
                
            }
        };

    }]);