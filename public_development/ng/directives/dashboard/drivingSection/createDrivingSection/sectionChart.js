angular.module('crewMeanApp')
    .directive('sectionChart', ['$compile', '$timeout', '$window', function ($compile, $window, $timeout) {
        return {
            restrict: 'E',
            scope: {
                trainStations: '='
            },

            templateUrl: 'ng/directives/dashboard/drivingSection/createDrivingSection/sectionChart.tmpl.html',
            controller: function ($scope, $http,
                $q, $state, $window, $location, $timeout, TimeCal, ChartService, TimeCalculator) {
                console.log("--Inside Section Chart--")

                var d = new Date();
                var n = d.getTime();
                $scope.chartId = "sectionChartId" + n;
                $scope.Days = Days;

                $scope.$watch('trainStations', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        reloadChart();
                    }
                });

                function reloadChart() {
                    if ($scope.trainStations.length > 0) {
                        $scope.chartHeading = $scope.trainStations[0].trainNo + "-" + $scope.trainStations[0].stationCode + "-" +
                            $scope.trainStations[$scope.trainStations.length - 1].stationCode;
                        $scope.trainNo = $scope.trainStations[0].trainNo;
                        createSections();
                        document.getElementById($scope.chartId).innerHTML = "";
                        $scope.divWidth = document.getElementById($scope.chartId).offsetWidth;
                        generateTrainsStationsChart();
                    }
                }
                function generateTrainsStationsChart() {
                    initializeValues();
                    loadChart();
                }

                function initializeValues() {
                    $scope.margin = { top: 50, left: 30, bottom: 40, right: 40 };
                    $scope.width = $scope.divWidth - $scope.margin.left - $scope.margin.right;
                    $scope.height = ($scope.trainStations.length - 1) * 50 - $scope.margin.top - $scope.margin.bottom;
                    finalWidth = $scope.width + $scope.margin.left + $scope.margin.right;
                    finalHeight = $scope.height + $scope.margin.top + $scope.margin.bottom + 100;
                    $scope.yAxisXValue = $scope.divWidth * 0.50;
                    $scope.tickCircleXValue = $scope.yAxisXValue - 3;
                    $scope.tickCircleRadious = 5;
                    $scope.tooltipId = "trainStationsToolTip";
                    $scope.stationsTextId = "trainStationsText";
                    $scope.stationsCircleId = "trainStationsTickCircle";
                    $scope.newStationDiv = "newStationDetailsDiv";
                    $scope.newChangeDiv = "newChangeDiv";
                    $scope.newCircleCounter = 0;
                    $scope.dimensionsYAxis = d3.scale.linear().range([0, $scope.height]).domain([0, $scope.trainStations.length - 1]);
                    $scope.legendXValue = $scope.divWidth * 0.75;
                    $scope.legendYValue = $scope.dimensionsYAxis(2);
                    $scope.legendCircleRadious = 7;
                    for (var station in $scope.trainStations) {
                        $scope.trainStations[station].tickVal = station;
                    }
                    ChartService.removeElementById($scope.tooltipId);
                    var div = d3.select("body").append("div")
                        .attr("class", "tooltip")
                        .attr("id", $scope.tooltipId)
                        .style("opacity", 0);



                }

                function loadChart() {
                    document.getElementById($scope.chartId).innerHTML = "";
                    $scope.graph = d3.select("#" + $scope.chartId).append("svg").attr("width", finalWidth).attr("height", finalHeight)
                        .append("g").attr("transform", "translate(" + $scope.margin.left + "," + $scope.margin.top + ")");

                    ChartService.drawYAxis($scope.graph, "", "y-axis", $scope.yAxisXValue, 'left', $scope.height, 0,
                        function () { $scope.createCircleForNewStation(this) },
                        function (d) { $scope.mouseOverYAxis(d) }, function (d) { $scope.mouseOutTick(d) });

                    ChartService.addYAxisHeading($scope.graph, $scope.chartHeading, $scope.yAxisXValue - 50,
                        function (d) { return $scope.dimensionsYAxis(0) - 30 }, "headingtext");



                    ChartService.addContentOnYAxis($scope.graph, $scope.trainStations, 'ticks',
                        function (d) { return $scope.stationsTextId + d._id },
                        function (d) { return ((d.isLocoChange) ? 'trainStationsText active' : 'trainStationsText') },
                        function (d) { return $scope.yAxisXValue - ((d.locoType) ? 110 : 55) },
                        function (d) { return $scope.dimensionsYAxis(d.tickVal) },
                        function (d) { return d.stationCode + ((d.locoType) ? "(" + d.locoType + ")" : "") },
                        //function (d) { return d.stationCode + ((d.locoType == 'Electric') ? " " : "[" + d.locoType + "]") },
                        function (d) { $scope.addOrRemoveLocoChange(d, document.getElementById($scope.stationsCircleId + d._id), this) },
                        function (d) { $scope.mouseOverTick(d) }, function (d) {
                            $scope.mouseOutTick(d)

                        });


                    ChartService.generateCircles($scope.graph, $scope.trainStations, "trainStationsTickCircles", $scope.stationsCircleId,
                        function (d) { return $scope.stationsCircleId + d._id },
                        $scope.tickCircleXValue, function (d) { return $scope.dimensionsYAxis(d.tickVal) }, $scope.tickCircleRadious,
                        function (d) {
                            return ((d.isLocoChange && d.isPlanSection) ? "blue" :
                                ((d.isLocoChange && d.isNewLocoChange) ? "red" :
                                    ((d.isLocoChange) ? "green" : "black")));
                        },
                        function (d) { $scope.addOrRemoveLocoChange(d, this, document.getElementById($scope.stationsTextId + d._id)) },

                        function (d) { $scope.mouseOverTick(d) }, function (d) { $scope.mouseOutTick(d) });

                    $scope.addLegends();
                }

                $scope.addOrRemoveLocoChange = function (data, ele1, ele2) {
                    if (data.stopNo != 1 && data.stopNo != $scope.trainStations.length) {
                        var changeDiv = document.getElementById($scope.newChangeDiv);
                        if (data.isLocoChange) {
                            data.isLocoChange = false;
                            data.isPlanSection = false;
                            data.locoType = "";
                            changeDiv
                                .setAttribute("style", "display : none");
                            reloadChart();
                        } else {
                            $scope.mouseOutTick(data)
                            $scope.removeNewStation();
                            changeDiv.setAttribute("style", "display : block;left : " + (d3.event.pageX-436) +
                            "px; top : " + (d3.event.pageY-260) + "px");
                            $scope.newChangeStation = data;
                        }
                    }
                }
                
                /**
                 * Function to close new change popup
                 */
                $scope.closeNewChange = function(){
                     document.getElementById($scope.newChangeDiv)
                                .setAttribute("style", "display : none");
                }
                
                /**
                 * Function to set station as new loco change
                 */
                $scope.setStationAsLocoChange = function (station) {
                    station.isLocoChange = true;
                    station.isNewLocoChange = true;
                    station.locoType = $scope.newChangeLocoType;
                    var changeDiv = document.getElementById($scope.newChangeDiv);
                    changeDiv.setAttribute("style", "display : none");
                    reloadChart();
                }

                /**
                 * Function to update loco types
                 */
                // function updateLocoTypes() {
                //     var locoType;
                //     for (var i = 0; i < $scope.trainStations.length; i++) {
                //         if($scope.trainStations[i].isLocoChange)
                //             locoType = $scope.trainStations[i].locoType;
                //         $scope.trainStations[i].locoType = locoType;  
                //     }
                // }


                /**
                 * This Function is used to create new circle for new change station
                 */
                $scope.createCircleForNewStation = function (ele) {
                    if ($scope.newCircleCounter == 0) {
                        //graph d3 object,id circle id,clas circle class,x position,y position,color to fill circle,
                        //tickCircleRadious circle radious,click function,mouseOver on mouseOver function,
                        //mouseOut on mouseOut function,dblclick
                        ChartService.generateCircle($scope.graph, "newChangeCircle" + $scope.newCircleCounter++,
                            "newChangeCircle", $scope.tickCircleXValue, d3.mouse(ele)[1], "red", $scope.tickCircleRadious,
                            function () { $scope.removeNewStation(this) }, function (d) { $scope.mouseOverNewStation() },
                            function (d) { $scope.mouseOutTick(d) });
                        $scope.newChangeCircleY = d3.mouse(ele)[1];
                        $scope.closeNewChange();
                        document.getElementById($scope.newStationDiv)
                            .setAttribute("style", "display : block;left : " + (d3.event.pageX-436) +
                            "px; top : " + (d3.event.pageY-309) + "px");
                        $scope.setBoundariesForInputs();
                    }
                }

                /**
                 * This function is used to set limits for new change station
                 */
                $scope.setBoundariesForInputs = function () {
                    for (var i = 0; i < $scope.trainStations.length; i++) {
                        if ($scope.dimensionsYAxis($scope.trainStations[i].tickVal) < $scope.newChangeCircleY &&
                            $scope.dimensionsYAxis($scope.trainStations[i + 1].tickVal) > $scope.newChangeCircleY) {
                            document.getElementById("newStationDistance").setAttribute("min", $scope.trainStations[i].distance);
                            document.getElementById("newStationDistance").setAttribute("max", $scope.trainStations[i + 1].distance);
                        }
                    }
                }

                /**
                 * This function is used to remove new station 
                 */
                $scope.removeNewStation = function (ele) {
                    if(!ele){
                        ele = document.getElementById("newChangeCircle0");
                    }
                    if(ele){
                        ele.parentNode.remove();
                        $scope.newCircleCounter--;
                    }
                    document.getElementById($scope.newStationDiv).setAttribute("style", "display:none");
                }


                /**
                 * This function is used to add new station change
                 */
                $scope.addNewStation = function () {
                    var newStation = {};

                    newStation.stationCode = $scope.newStationCode;
                    newStation.distance = $scope.newStationDistance;
                    newStation.arrivalTime = $scope.newStationArrivalTime;
                    newStation.departureTime = $scope.newStationDepartureTime;

                    for (var i = 0; i < $scope.trainStations.length; i++) {
                        newStation.trainNo = $scope.trainStations[i].trainNo;
                        if ($scope.dimensionsYAxis($scope.trainStations[i].tickVal) < $scope.newChangeCircleY &&
                            $scope.dimensionsYAxis($scope.trainStations[i + 1].tickVal) > $scope.newChangeCircleY) {
                            if (TimeCalculator.hrsToMinutes(
                                ((i == 0) ? $scope.trainStations[i].departureTime :
                                    $scope.trainStations[i].arrivalTime)) >
                                TimeCalculator.hrsToMinutes(newStation.arrivalTime)) {
                                newStation.arrivalDay = $scope.trainStations[i].arrivalDay + 1;
                            } else {
                                newStation.arrivalDay = $scope.trainStations[i].arrivalDay;
                            }
                            newStation.departureDay = 
                                (TimeCalculator.hrsToMinutes(newStation.arrivalTime) <
                                    TimeCalculator.hrsToMinutes(newStation.departureTime))?
                                    newStation.arrivalDay:newStation.arrivalDay+1;
                            $scope.trainStations.splice(i + 1, 0, newStation);
                            break;
                        }
                    }
                    document.getElementById($scope.newStationDiv).setAttribute("style", "display:none");
                    $scope.changeStopNumbers();
                    reloadChart();
                }


                /**
                 * This function is used to change stop numbers
                 */
                $scope.changeStopNumbers = function () {
                    for (var i = 0; i < $scope.trainStations.length; i++) {
                        $scope.trainStations[i].stopNo = i + 1;
                    }
                }

                /**
                 * This function is used to show tooltip on mouse over event
                 */
                $scope.mouseOverTick = function (d) {
                    ChartService.showAndGetToolTip($scope.tooltipId).innerHTML =
                        d.stationCode + "<br>" +
                        "isLocoChange: " + ((d.isLocoChange) ? "YES" : "NO") + "<br>" +
                        "LocoType : " + d.locoType + "<br>" +
                        "Stop Number: " + d.stopNo + "<br>" +
                        "Arrival Day : " + d.arrivalDay+1 + "<br>" +
                        "Arrival Time: " + d.arrivalTime + "<br>" +
                        "Departure Day : " + d.departureDay+1 + "<br>" +
                        "Departure Time: " + d.departureTime + "<br>" +
                        "Distance: " + d.distance + "<br>" +
                        ((d.stopNo != 1 && d.stopNo != $scope.trainStations.length) ?
                            "Click me to select/deselect <br>change station" : "");
                }

                /**
                 * This function is used hide tooltip
                 * @param d
                 */
                $scope.mouseOutTick = function (d) {
                    ChartService.hideToolTip($scope.tooltipId);
                }

                /**
                 * This function is used to show tooltip on mouse over event
                 */
                $scope.mouseOverNewStation = function () {
                    ChartService.showAndGetToolTip($scope.tooltipId).innerHTML =
                        "click me to <br>remove new Change Station";
                }

                /**
                 * This function is used to show tooltip on mouse over event
                 */
                $scope.mouseOverYAxis = function (d) {
                    ChartService.showAndGetToolTip($scope.tooltipId).innerHTML =
                        (($scope.newCircleCounter == 0) ? "click me to<br>add new Change Station" :
                            "Deselect previous new Change Station to<br>add another new Change Station");
                }

                /**
                 * Function to add legends
                 */
                $scope.addLegends = function () {
                    //d3 object,data to display,id circle id,x position,y position,fill circle,tickCircleRadious circle radious
                    //dblclick function,mouseOver function, mouseOut function,dblCclick function
                    ChartService.addLegend($scope.graph, "Global Change", "globalChange", $scope.legendXValue, $scope.legendYValue,
                        "green", $scope.legendCircleRadious, "", "", "", "");
                    ChartService.addLegend($scope.graph, "User Plan Change", "userPlanChangeLegend", $scope.legendXValue, $scope.legendYValue + 20,
                        "blue", $scope.legendCircleRadious, "", "", "", "");
                    ChartService.addLegend($scope.graph, "New User Plan Change", "newUserPlanChangeLegend", $scope.legendXValue, $scope.legendYValue + 40,
                        "red", $scope.legendCircleRadious, "", "", "", "");
                }


                /**
                 * Function to remove existing sections
                 */
                $scope.removeExistingSection = function (ev) {
                    var apideleteSec = apiUrl + "/" + "deleteuserPlanSection" + "/" + $scope.trainNo;
                    var deferred = $q.defer();
                    $http.delete(apideleteSec).then(function (successRes) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Removed Existing Section !')
                                .position('right')
                                .hideDelay(3000)
                                .theme("error-toast")
                        );
                        deferred.resolve(successRes);
                    });
                    return deferred.promise;
                }


                /**
                 * Function to save sections
                 */
                $scope.saveSection = function (event) {
                    var apiSectionUrl = apiUrl + "/" + "userPlanSection";
                    $scope.removeExistingSection(event).then(function (result) {
                        if ($scope.sections.length > 0) {
                            $http.post(apiSectionUrl, $scope.sections).then(function (response) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Section Created Successfully !')
                                        .position('right')
                                        .hideDelay(3000)
                                        .theme("success-toast")
                                );
                            });

                        }
                    });
                }
                
                function createSections(){
                    $scope.selectedStations = [];
                    $scope.sections = [];
                    var planObj = JSON.parse($window.sessionStorage.userPlan);
                    for (var i = 0; i < $scope.trainStations.length; i++) {
                        if ($scope.trainStations[i].isLocoChange == true) {
                            $scope.selectedStations.push($scope.trainStations[i]);
                        }
                    }
                    if($scope.selectedStations.length>0){
                            for (var i = 1; i < $scope.selectedStations.length; i++) {
                                var section = {};
                                section.trainNo = $scope.selectedStations[i-1].trainNo;
                                section.startDay = $scope.selectedStations[i-1].departureDay;
                                section.departureDay = $scope.selectedStations[i-1].departureDay
                                section.departureTime = $scope.selectedStations[i-1].departureTime;
                                section.arrivalDay = $scope.selectedStations[i].arrivalDay;
                                section.arrivalTime = $scope.selectedStations[i].arrivalTime;
                                section.locoType = $scope.selectedStations[i-1].locoType;
                                section.departureMinutes = $scope.selectedStations[i-1].departureMinutes;
                                section.arrivalMinutes = $scope.selectedStations[i].arrivalMinutes;
                                section.departureDateTime = $scope.selectedStations[i-1].departureDateTime;
                                section.arrivalDateTime = $scope.selectedStations[i].arrivalDateTime;
                                section.fromStation = $scope.selectedStations[i-1].stationCode;
                                section.toStation = $scope.selectedStations[i].stationCode;
                                section.distance = $scope.selectedStations[i].distance - $scope.selectedStations[i-1].distance;
                                section.orderNo = i;

                                section.preSectionFrom = "";
                                section.nextSectionTo = "";
                                section.distanceFromSource = "";
                                section.distanceFromPreSectionFrom = "";
                                section.distanceFromPreInspection = "";
                                section.distanceToNextSectionTo = "";
                                section.distanceToNextInspection = "";
                                section.distanceToDestination = "";
                                section.durationFromSource = "";
                                section.durationFromPreSectionFrom = "";
                                section.durationFromPreInspection = "";
                                section.durationToNextSectionTo = "";
                                section.durationToNextInspection = "";
                                section.durationToDestination = "";
                                section.userPlanId = planObj._id;
                                var depObj = {
                                    day: section.departureDay,
                                    time: section.departureTime

                                }
                                var arrObj = {
                                    day: section.arrivalDay,
                                    time: section.arrivalTime
                                }
                                var diffDur = TimeCal.diffDateTimeObj(depObj, arrObj, 'mins');
                                section.duration = TimeCal.convertDateTimeObjToNumber(diffDur);
                                $scope.sections.push(section);
                            }
                    }
                }
                reloadChart();
            }
        };
    }]);