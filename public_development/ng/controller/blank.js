/**
 * 
 */

'use strict';


var app = angular.module('crewMeanApp')
  .controller('blankCtrl', function($scope,$location,$http,$q,$filter,toaster, $document,$state) {
	  
	  String.prototype.replaceAll = function(find, replace) {
          var str = this;
          return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      };
      $scope.string = $state.current.name;
      $scope.title = $scope.string.replaceAll('.', ' > ');
      $scope.headertitle = $scope.title.split('>');
      
	     
	     $scope.selectedCompany={};
	     $scope.companyDetailsList = []; 
	     
	     $scope.compname = "dasdsada";
	     $scope.isInputDisable = false;
	     $scope.isWalkingInputDisable = false;
	     
	     
	     

					$scope.companydetailobj = {
						companydetails : []

					};
					
					 $scope.companydetailobject ={
				    		 companydetails : {
				    			 "companyName":"",
				    		     "companyAddress":"",
				    		     "city":"",
				    		     "state":"",
				    		     "country":"",
				    		 },
				    		 "venu":"",
				    		 "shortVenue":"",
				    		 "walkingdate":"",
				    		 "walkingTime":""
				    		 
				    		 
				     };
					
	     $scope.blankcompanydetail = {};
	     $scope.isDisable = false;
	     $scope.choices = [{'id':0,'companydetailobj':null,'companydetailobject':null},{'id':1,'companydetailobj':null,'companydetailobject':null}];
	     
	    
	     $scope.selectedCompany = function(selected) {
			 
			 
			 if (!selected) {
					$scope.reset();
					$scope.isDisable = false;
					return $scope.companydetailobj.companydetails;
				}
			 
	     }
	   

					
					 
					 $scope.getCompanyDetails = function(query,timeout) {
				    	 $scope.companydetails = [];
				    	 if (!query) {
						      return $scope.companydetails;
						  }
				    	
				    	 var deferred = $q.defer();
				    	 $http.get('api/v1/company/getAllCompany?companyName='+ query).then(function(res){
				    		 $scope.companydetails  = res.data.content;
				    		 if($scope.companydetails.length>0){
				    			 deferred.resolve($scope.companydetails);	 
				    		 }else{
				    			 $scope.companydetailobj.companydetails.companyName = query;	 
				    		 } 
				    		 
				    		 
				    		 
				    	 })
				    	 
				    	 return deferred.promise;
				    	 
				     }
				     
				      $scope.getCompanyDetails();


	      
				      $scope.saveSingleCompany  = function(){
				    	  
				    	  angular.forEach($scope.choices,function(response){
				    		  
				    		  
						     $http.post("api/v1/company/saveWalking",response.companydetailobject).then(function(res){
						    			 console.log(res);
						    			 toaster
											.pop({
												type : 'success',
												title : 'Save compnay ',
												body : "hhhhhhhhhhhhhhhh"
											});
						    		 },function(error){
						    			 
						    		 });
					    		 
				    		
				    		  
				    	  })
				    	  
				    	  
				    	  
				    	  
				    	
				    	  
				    	  
				      }
	                               
	                               
	     $scope.saveCompany = function(){
	    	 
	    	 
	    	 var customWalkingList = [];
	    	 
	    	 if (typeof($scope.choices) != 'undefined' && $scope.choices != null){
	    		 
	    		 var nCount  = 0;
	    		 angular.forEach($scope.choices,function(res){
	    			 console.log(res);
	    			      var customwalk = {};
	    			      customwalk.id =res.id;
	    			      customwalk.city = res.companydetailobj.companydetails[nCount].city;
	    			      customwalk.companyName = res.companydetailobj.companydetails[nCount].companyName;
	    			      customwalk.companyAddress = res.companydetailobj.companydetails[nCount].companyAddress;
	    			      customwalk.state = res.companydetailobj.companydetails[nCount].state;
	    			      customwalk.country = res.companydetailobj.companydetails[nCount].country;
	    			      customwalk.shortVenue = res.companydetailobj.companydetails[nCount].shortVenue;
	    			      customwalk.venu= res.companydetailobj.companydetails[nCount].venu;
	    			      customwalk.walkingTime = res.companydetailobj.companydetails[nCount].walkingTime;
	    			      customwalk.walkingdate= res.companydetailobj.companydetails[nCount].walkingdate;
	    				   
	    			      customWalkingList.push(customwalk);
	    			       nCount++;
	    			      

	  		    		
	    		 
	    		 });
	    		 
	    		 console.log(customWalkingList);
	    		 $http.post("api/v1/company/saveDetails",customWalkingList).then(function(res){
		    			 console.log(res);
		    			 toaster
							.pop({
								type : 'success',
								title : 'Driving Section Saved',
								body : "hhhhhhhhhhhhhhhh"
							});
		    		 },function(error){
		    			 
		    		 });
	    		 
	    		 
	    		
	    	 }
	     }
	     
	      
	     
	    
	     $scope.clearInput = function(id) {
				if (id) {$scope.$broadcast('angucomplete-alt:clearInput',id);} 
				else {$scope.$broadcast('angucomplete-alt:clearInput');}
			}
	     $scope.reset = function() {
	    	 $scope.companydetailobj = angular.copy($scope.blankcompanydetail);
	    	 $scope.clearInput('ddlHeadStation');
	    	 $scope.isDisable  = false;
		
			};
	     
	    
	     
	     

	     $scope.addDynamicRow= function(companydetailobj) {
	         var newId = $scope.choices.length;
	         if($scope.choices.length>9){
	        	 toaster
					.pop({
						type : 'error',
						title : 'You cant added more than 10 rows',
						body : "You cant added more than 10 rows"
					});
	        	 return;
	        	 
	         }
	         //$scope.companydetailobj = null;
	         $scope.choices.push({'id':newId,'companydetailobj':$scope.companydetailobj});
	     };
	     
	     $scope.removeDynamicRow = function(choiceTypeObj){
	    	 
	    		  $scope.choices.splice($scope.choices.indexOf(choiceTypeObj),1); //The splice function used to delete the seleced Users from an Array based on Index  
				  toaster.pop({type: 'success', title: 'Row has been Removed', body: 'Row Removed Successfully!!!'}); // On Success PopUp the Toaster once crewType removed from DB
	    	 
	     }

	     $scope.showAddChoice = function(choice) {
	       // return choice.id === $scope.choices[$scope.choices.length-1].id;
	     };
	    
	 
	  
  });
angular.module('walkinApp').directive('listener', listener);
function listener($http) {
	  return {
	  restrict: 'AE',
	   link: function(scope, elem, attrs) {
		   
		   
		   //scope.isInputDisable = false;
		   elem.bind("change", function(event) {
		        scope.$parent.selectedCompany = function (selected){
		        	
		        	 if (!selected) {
							$scope.reset();
							$scope.isDisable = false;
							return $scope.companydetailobj.companydetails;
						}
		        	
		        	 
		        	 var choiceId = scope.choice.id;
		        	 
		        	 switch(choiceId){
		        	 
		        	 case 0:
		        		 scope.companydetailobj.companydetails
							.push({
								'companyName' : selected.description.companyName,
								'companyAddress' : selected.description.companyAddress,
								'city' : selected.description.city,
								'state' : selected.description.state,
								'country' : selected.description.country
							});
					scope.$parent.choices[0].companydetailobj = scope.companydetailobj;
					//scope.isDisable = true;
					scope.$parent.isInputDisable = false;
					break;
		        	 case 1:
		        		 scope.companydetailobj.companydetails
							.push({
								'companyName' : selected.description.companyName,
								'companyAddress' : selected.description.companyAddress,
								'city' : selected.description.city,
								'state' : selected.description.state,
								'country' : selected.description.country
							});
					scope.$parent.choices[1].companydetailobj = scope.companydetailobj;
					//scope.isDisable = true;
					scope.$parent.isInputDisable = false;
					break;
					
		        	 case 2:
		        			 scope.companydetailobj.companydetails
								.push({
									'companyName' : selected.description.companyName,
									'companyAddress' : selected.description.companyAddress,
									'city' : selected.description.city,
									'state' : selected.description.state,
									'country' : selected.description.country
								});
						scope.$parent.choices[2].companydetailobj = scope.companydetailobj;
						//scope.isDisable = true;
						scope.$parent.isInputDisable = false;
						break;
		        	 }
		    	 }
		        scope.$parent.isInputDisable = true;
		        scope.$parent.isWalkingInputDisable  = true
		       // scope.$parent.isDisable = ( scope.$parent.isDisable) ? false : true;
		        
		     });
		       
	   },
	  
	  }
	}

app.directive('myDirective', function($compile) {
	  return {
	    restrict: 'AE', //attribute or element
	    scope: {
	      myDirectiveVar: '=',
	    },
	    template: '<div class="some">' +
	      '<input ng-model="myDirectiveVar"></div>',
	    replace: true,
	    link: function($scope, elem, attr, ctrl) {
	      console.debug($scope);
	  
	    }
	  };
	});


app.directive('stRatio',function(){
    return {
        link:function(scope, element, attr){
          var ratio=+(attr.stRatio);
          
          element.css('width',ratio+'%');
          
        }
      };
  })

