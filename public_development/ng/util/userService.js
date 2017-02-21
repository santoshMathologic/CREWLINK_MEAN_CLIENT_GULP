
(function(){

    ' use strict';
    var app = angular.module("crewMeanApp");
    app.provider("UserService", function () {
        var provider = {};
        var config = {};
        config.sidebarTrigger = true;
        provider.$get = function($http,$q,$timeout,$cookies) {
            var service = {};
            service.config = {};
            service.config.sidebarTrigger = config.sidebarTrigger;
            service.CurrentUserDetails = null;
            

            service.getUserPlan = function () {
                return "User Plan has been set SuccessFully";
            };

            service.getCurrentUser = function () {
                var deferred = $q.defer();
                var query = {
                    limit: 10,
                    page: 1,
                    sortBy: "userName"
                };
                var url = "http://localhost:4000/api/v1/admin/users";
                $http.get(url, { params: query }).then(function onSuccess(response) {
                    service.CurrentUserDetails = response.data.results;
                    console.log(service.CurrentUserDetails);  
                }, function onError(response) {

                });


            };

            service.getUser = function () {
                return service.CurrentUserDetails;
            };



            return service;
        };
        return provider;
    });


})();