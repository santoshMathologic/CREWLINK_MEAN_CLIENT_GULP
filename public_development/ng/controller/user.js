'use strict';

angular.module('crewMeanApp')
  .controller('userCtrl', function($scope,$location,$http,$state) {
	  
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
	 
	 	  
  });
