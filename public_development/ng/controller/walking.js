/***
 *   Walking Controller
 *   @author : rakesh kumar
 *   @description : 
 *   @date: 11-28-2016
 * 
 */
' use strict';

angular.module('crewMeanApp')
  .controller('walkingCtrl', function($scope,$location,$http,toaster,$state) {
	 
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
		
		
    
	  
	  
	   
	   
	 	  
  });
