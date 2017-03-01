angular.module('crewMeanApp')
    .directive('listDrivingSection', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/drivingSection/listDrivingSection/listDrivingSection.tmpl.html',
            controller: function($scope, $state, $window, $http, $location) {
                console.log("Inside the List Driving Section");
                String.prototype.replaceAll = function(find, replace) {
                    var str = this;
                    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                };
                $scope.string = $state.current.name;
                $scope.string = $scope.string.replaceAll('.', ' > ');
                $scope.$parent.title = $scope.string;

                $scope.query = {
                    order: 'trainNo',
                    limit: 10,
                    page: 1,
                    trainNo: "",
                    startDay: "",
                    fromStation: "",
                    toStation: "",
                    arrivalTime: "",
                    departureTime: "",
                    locoType: "",
                    sectionType: "",
                    distance: "",
                    duration: ""
                };
                $scope.query.trainNo = ($state.params.trainNo) ? $state.params.trainNo : "";
                $scope.day = ($state.params.day) ? $state.params.day : "all";
                $scope.trainRunningDays = [];
                $scope.query1 = {
                    trainNo: $scope.query.trainNo
                };
                /**
                 * Function to get train details from database
                 */
                $scope.getTrainsDetails = function() {
                    if ($scope.query.trainNo != "") {
                        $http.get(apiUrl + '/' + 'trainList', { params: $scope.query1 })
                            .then(function(response) {
                                $scope.trainRunningDays = response.data.results[0].runningDays;
                            });
                    }
                }
                $scope.getTrainsDetails();
                $scope.Days = Days;
                $scope.totalPages = 1;
                $scope.totalRecords = 0;

                $scope.sections = [];

                $scope.trainNo = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.startDay = {
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
                $scope.arrivalTime = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.departureTime = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.locoType = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.sectionType = {
                    options: {
                        debounce: 500
                    }
                }
                $scope.distance = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.duration = {
                    options: {
                        debounce: 500
                    }
                };
                $scope.currentPage = 1;
                $scope.onPaginate = function() {
                    $scope.getSections();
                }

                $scope.$watch('query', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.getSections();
                    }
                }, true);

                $scope.$watch('day', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.updateDays();
                    }
                }, true);
                
                $scope.$watch('query.trainNo', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.getTrainsDetails();
                    }
                }, true);

                /**
                 * Function to get all sections of train from database
                 */
                $scope.getSections = function() {
                    $http.get(apiGetPlanSections, { params: $scope.query })
                        .then(function(response) {
                            $scope.sections = response.data.results;
                            $scope.globalSections = JSON.parse(JSON.stringify($scope.sections));
                            $scope.updateDays();
                            $scope.currentPage = response.data.current;
                            $scope.perPage = response.data.options.perPage;
                            $scope.totalPages = response.data.last;
                            $scope.totalRecords = response.data.count;
                        });
                }
                $scope.getSections();

                /**
                 * Function to update days
                 */
                $scope.updateDays = function() {
                    if ($scope.trainRunningDays.indexOf(parseInt($scope.day)) == -1 && $scope.day != 'all')
                        $scope.day = 'all';
                    if ($scope.day != 'all' && $scope.day != '') {
                        var day;
                        for (var i = 0; i < $scope.sections.length; i++) {
                            day = $scope.globalSections[i].departureDay + parseInt($scope.day);
                            $scope.sections[i].departureDay = (day > 6) ? day - 7 : day;
                            day = $scope.globalSections[i].arrivalDay + parseInt($scope.day);
                            $scope.sections[i].arrivalDay = (day > 6) ? day - 7 : day;
                        }
                    }else{
                        $scope.sections = JSON.parse(JSON.stringify($scope.globalSections));
                    }
                }
            }
        };
    }]);