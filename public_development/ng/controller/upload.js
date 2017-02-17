/**
 * 
 */

'use strict';

angular.module('crewMeanApp')
  .controller('uploadCtrl', function($scope,$location,$http,$state,$window,toaster) {
	  
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
      
      $scope.isLoading = false;
      $scope.walkingDetails  = [];
	  
	  $scope.companyDetails= [];
	  $scope.query = {
              sort: 'companyName',
              limit: 10,
              page: 0,
              companyName: "",
              city:""
             
          };
	  
	  $scope.$watch('query', function(newValue, oldValue) {
          if (newValue !== oldValue) {
        	  $scope.getAllRecords();
          }
      }, true);

	 /* 
	  $scope.findByAllParamsUsers = function(){
 		 $http.get("/api/v1/users/getUsers?sort="+$scope.query.sort+"&limit="+$scope.query.limit+"&page="+$scope.query.page+"&username="+$scope.query.username+"&firstname="+$scope.query.firstName+"&lastName&email&role&password&isActive=true").then(function(resultObj){
      		
      		$scope.users = resultObj.data.content;
      		console.log(resultObj.data.content);
      		$scope.isLoading  = false;
      	},function(response){
      		$scope.isLoading  = false
      	})
      	

 	 }
	*/
	  
	
	  
	  $scope.getAllRecords = function(){
		  $scope.isLoading = true;
		  $http.get("/getAllRecords?sort="+$scope.query.sort+"&limit="+$scope.query.limit+"&page="+$scope.query.page+"&companyName="+$scope.query.companyName+"&city="+$scope.query.city).then(function successResponse(response){
		 		 $scope.companyDetails  = response.data.content;
		 		 
		 		$scope.isLoading = false;
		 		//$location.url('/404');
		 		
		 		 
		 	 },function errorResponse(errorResponse){
		 		 
		 		$scope.isLoading = false;
		 		$window.location.href = '/errorPages/404error.html';
		 		 
		 	 });  
	  }
	  
	  $scope.getAllRecords();
	  
	  $scope.getAllWalkingRecords = function(){
		  $scope.isLoading = true;
		  
		  $http.get('/getAllWalkingRecords').then(function successResponse(res){
		 		 $scope.walkingDetails  = res.data.content;
		 		  $scope.isLoading = false;
		 		 
		 		 
		 	 },function errorResponse(errorResponse){
		 		 $scope.isLoading = false;
		 	 });  
	  }
	  $scope.getAllWalkingRecords();
	  
	   $scope.editUserPassword = function(){
		   $scope.passwordMatch = false;
		   $scope.currentPassword = "vivek";
			  $http.get('/data/user.json').then(function successResponse(res){
			 		 $scope.userLists  = res.data.content;
			 		 
			 		loop: for(var count = 0;count<$scope.userLists.length;count++){
			 			     if($scope.userLists[count].password===$scope.currentPassword){
			 			    	$scope.passwordMatch  = true; 
			 			    	 if($scope.passwordMatch){
			 			    		// $state.go("login"); // Here once password match its redirect to login page 
			 			    		 break loop;
			 			    	 }
			 			    	 
			 			     }else{
			 			    	 console.log("The Password Not Matched");
			 			     }
			 			   
			 		   }
			 		  
			 		 
			 		 
			 	 },function errorResponse(errorResponse){
			 		 
			 		 console.log("Error in Fetcing Data From Server");
			 		 
			 	 });  
		   
		   
	   }
	   $scope.editUserPassword();
	   
	   $scope.removeCompany = function(company) {
		
		   $scope.companyDetails.splice($scope.companyDetails.indexOf(company),1);  // Splice() Method adds/removes items to/from an array
					toaster.pop({type: 'success', title: 'Compnay Removed', body: 'Compnay Removed Successfully!!!'}); // Toaster to show the PopUp message after remove 
				
	  };
	  
	  $scope.removeWalking = function(walk) {
			
		   $scope.walkingDetails .splice($scope.walkingDetails .indexOf(walk),1);  // Splice() Method adds/removes items to/from an array
					toaster.pop({type: 'success', title: 'Walking Removed', body: 'Walking  Removed Successfully!!!'}); // Toaster to show the PopUp message after remove 
				
	  };
	 
	 	  
  });

