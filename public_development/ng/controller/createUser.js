'use strict';

angular.module('crewMeanApp')
  .controller('createUserCtrl', function($scope,$location,$http,$state) {
	 
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      

      $scope.query = {
              sort: 'username',
              limit: 10,
              page: 0,
              username:"",
              password:"",
              firstName:"",
              lastName : "",
              email : "",
      	  	  mobileNo : "",
      	  	  telephoneNo :"",
      	  	  extension : "",
  			  employeeNo : "",
  			  role : "",
  			  isActive : ""
          };
      
     

      
      $scope.getUsers = function(){
    	  $http.get("/api/v1/user/getUsers",{params:$scope.query}).then(function successResponse(success){
    		  
    	     	 $scope.usersList = success.data.content;
    	     	 
    	      },function errorResponse(error){
    	     	 
    	     	 
    	      });  
      }
      
      $scope.getUsers();
      
      
     
      
	 	  
  });
