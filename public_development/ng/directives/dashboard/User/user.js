' use strict';

angular.module('crewMeanApp')
    .directive('user', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/User/user.tmpl.html',
            controller: function ($scope, $state, $window, $location,$http) {

                String.prototype.replaceAll = function(find, replace) {
                     var str = this;
                     return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
                 };
                 $scope.string = $state.current.name;
                 $scope.title = $scope.string.replaceAll('.', ' > ');
                 
                 $scope.usersList  = [];
                
                 $scope.enabled = true;
                 $scope.onOff = true;
                 $scope.yesNo = true;
                 $scope.disabled = true;
                 
                 $scope._ = _;
                 
                 $scope.userdetails ={};
                 
                 $scope.changeCallback = function() {
                	    console.log('This is the state of my model ' + $scope.enabled);
                	  };
                 

                      $scope.getRoles = function(){
                      	$scope.query1 = {
                      			  sort: 'name',
                                    limit: 10,
                                    page: 0,
                      			
                      	}
                          $http.get("/api/v1/roles/getUserRoles",{params:$scope.query1}).then(function success(response){
                       	   $scope.roles = response.data.content;
                       	   
                          },function errorResponse(error){
                       	   
                       	   
                       	   
                          });
                          
                       }
                       
                       $scope.getRoles();
             
                $scope.saveNewUser = function(userdetails){
                	$http.post("/api/v1/user/saveUser",userdetails).then(function successResponse(response){
                		
                		console.log(response);
                		
                	},function errorResponse(response){
                		
                		
                	});
                	
                	console.log(userdetails);
                };
                
                var original = angular.copy($scope.userdetails);
                $scope.reset = function(choice) {
                if(choice==1){	
              	  $scope.userdetails= angular.copy(original);
                }
                if(choice==2){
                	$scope.userForm.$dirty = false;
                	$scope.userForm.$pristine = true;
                	$scope.userForm.$submitted = false;
                }
                };
                
          
            


               
            }

        };
    }]);