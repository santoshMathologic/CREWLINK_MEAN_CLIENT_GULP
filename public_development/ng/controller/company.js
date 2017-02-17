/**
 * 
 */

'use strict';

angular.module('crewMeanApp')
  .controller('companyCtrl', function($scope,$location,$http,$state,toaster) {
	  
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
  
	  
	   $scope.walking = {};
	   $scope.companyLists = [];
	   $scope.isLoading = true;
	   
	   $scope.serverScopeFetch = new serverTableRetrive(
			      "/api/v1/company/getInfo",
			      $http,
				   
				  function(){					
					  $scope.isLoading = true;
				  },
				  function(resultObj){		
					  $scope.companyLists  = resultObj;
					  $scope.isLoading = false;
				  }
		  );
	   
	   $scope.checkwalking= function(compnayObj){
		   
		   
		   if(typeof compnayObj === 'object'||typeof compnayObj !== "undefined"){
			
			   $scope.query = {
					   walkinId : (compnayObj.id) ? compnayObj.id : 0 
					}
			   $http.get("api/v1/walking/getWalkinginfo",{params:$scope.query}).then(function(responseObj){
				   $scope.walking = responseObj.data;
				   $scope.isLoading = false;
				   
			   },function(errorResponse){
				   
				   
				   
			   });
		  
		   }
		   
	   }
	   $scope.removeCompany =  function(companyobj){
		   $http.put('/api/v1/company/removeCompany',companyobj)
           .success(function (success) {
        	   console.log(success);
			   $scope.companyLists.splice($scope.companyLists.indexOf(companyobj),1); // Splice the division Array and remove object from Array
			   toaster.pop({type: 'success', title: 'company Removed', body: 'company Removed Successfully!!!'}); // PopUp the toaster Once division has removed 
           },function(error){
        	   toaster.pop({type: 'error', title: 'Error', body: 'Unable To Remove company. Please Try Again!!!'}); // On Error Response PopUp the toaster if division Not removed from DB
			   console.log(error); 
        	   
           })
        
	   }
	   
	   
	  
	  
	  
	 
	 	  
  });



