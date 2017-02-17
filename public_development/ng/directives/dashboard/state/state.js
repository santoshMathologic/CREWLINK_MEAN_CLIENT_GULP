' use strict';

angular.module('crewMeanApp')
    .directive('stats',function() {
    	return {
  		templateUrl:"ng/directives/dashboard/stats/stats.tmpl.html",
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@',
        'fasize':'@'
  		}
  		
  	}
  });
