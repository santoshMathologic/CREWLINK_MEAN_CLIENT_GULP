/**
 * 
 */



var ServerTableFetch  =  function(url,httpService,callBackBefore,callBackAfter,callBackAfterError){
	
	this.url = url;
	this.urlValue = url;
	this.callBackBefore = callBackBefore;
	this.callBackAfter = callBackAfter;
	this.callBackAfterError  = callBackAfterError;
	this.httpService = httpService;
	
	this.process = function(tableState){
		
		this.callBackBefore("CAllBACK BEFORE");
		if(angular.isFunction(this.url)){
			this.urlValue = this.url(tableState);
		} 
		
		if(this.urlValue == ''){
			this.callBackAfterError("no Fetch");
			return;
		}
		
		var pagination = tableState.pagination;
		var page = (pagination.start/pagination.number) || 0;     
		var size = pagination.number || 10;  
		var sort = (tableState.sort.predicate)?tableState.sort.predicate:"";
		var sortDir = (tableState.sort.reverse)?"asc":"desc";
		
		var searchParams = "";
		if(this.urlValue.indexOf("?")==-1){
			searchParams = "?";
		}else{
			searchParams = "&";
		}
		
		if(tableState.search.predicateObject){
			
			for(var searchItem in tableState.search.predicateObject){
				
				var re = new RegExp(searchItem+"=(\w+)","g");
				if(searchParams.search(re)!=-1){
					searchParams = searchParams.replace(re, searchItem+'='+tableState.search.predicateObject[searchItem]+'&');
				}else{
					searchParams += searchItem+"=" +tableState.search.predicateObject[searchItem]+"&";
				}
			}
		}
		
	//	var call = this.urlValue + searchParams;
			var call = this.urlValue;
		
		
		this.httpService.get(call)
		.then(function successCallBack(response){
			  	var resultObj = response.data.results;
			     tableState.pagination.numberOfPages = response.data.totalPages;
			     resultObj.tableState = tableState;
			  
			     this.callBackAfter(resultObj);
			  
		}.bind(this),
		function errorCallBack(response){
			if(this.callBackAfterError){
				this.callBackAfterError(response);
			}
		}.bind(this));
		
		
	}.bind(this);  // Process Method Completed 
	
	
}

ServerTableFetch.prototype = {
		url : null,
		searchItems : null,
		resultObj : null,
		process : null,
		callBack : null
	};