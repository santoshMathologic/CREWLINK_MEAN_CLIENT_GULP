' use strict';

angular.module('crewMeanApp')
    .directive('state',function() {
    	return {
  		templateUrl:"ng/directives/dashboard/state/state.tmpl.html",
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
