'use strict';

angular.module('crewMeanApp')
  .controller('userplanCtrl', function($scope,$location,$http,$state,toaster) {
	  
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
      
      
      
      //// Server Table Fetch 
      
      $scope.userPlanList  = [];
      var planName = "";
      var limit = 10;
      var page  = 0;
      $scope.serverFetch = new ServerTableFetch(
    		  "api/v1/userPlan/getUserPlan?planName="+planName+"&limit="+limit+"&page="+page,
					$http,function callBackBefore() {// Before processing
					
					$scope.isLoading = true;

				}, function callBackAfter(resultObj) {// After processing request
					$scope.userPlanList = resultObj;
					
					
				});

      
      
      
      
      $scope.query = {
              sort: 'planName',
              limit: 10,
              page: 0,
            
          };
      $scope.$watch('query', function(newValue, oldValue) {
          if (newValue !== oldValue) {
        	  $scope.getUserPlan();
          }
      }, true);
      
      
     
       
       $scope.deleteUserPlan = function(userplan){
    	   $scope.userPlanList.splice($scope.userPlanList.indexOf(userplan),1);  // Splice() Method adds/removes items to/from an array
			toaster.pop({type: 'success', title: 'UserPlan Removed', body: 'UserPlan Removed Successfully!!!'}); // Toaster to show the PopUp message after remove
    	   
       }
       
       $scope.selectUserPlan = function(userplan){
          $state.go("home.dashboard.commondashboard");
    	   console.log(userplan);
    	   
       }
       
   	$scope.setInitValues = function() {
		$scope.isSave = true;
		$scope.action = "Create New";
		$scope.userPlan = {};
		$scope.submitted = false;
	}
	$scope.setInitValues();

  
	$scope.saveUserPlan = function(userPlan, type) {
		if ($scope.userPlanList.length > 9) {
			toaster
					.pop({
						type : 'error',
						title : 'Error',
						body : 'You can add more than 10 User Plans . Please delete existing user plan to add new one'
					});
		} else {
			if (userPlan.name){
				if (type == "create"){
					
					var user = {};
						
						$http.get("/api/v1/userdetails/getCurrentUser").then(function successResponse(response){
							user = response.data;
							  
							
						},function errorResponse(response){
							
						})
					
					
					toaster
					.pop({
						type : 'success',
						title : 'Plan Created Successfully !!!!!!!!',
						body : 'Plan Created Successfully !!!!!!!!'
					});
					
				}
					
			}
			
		}
	 
	};
  
  
  
  });
	
	
	 	  
  
