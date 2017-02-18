/**
 * 
 */
'use strict';

var serverTableRetrive = function(url,httpServices,callBackBefore,
	    callBackAfter, callBackAfterError) {
	
	this.url = url;
	this.urlValue = url;
	this.httpServices = httpServices;
	this.callBackBefore = callBackBefore;
	this.callBackAfter = callBackAfter;
	this.callBackAfterError = callBackAfterError;
	
	this.serverTableProcess = function(tableState){
		
		this.callBackBefore("CAllBACK BEFORE");
		if(angular.isFunction(this.url)){
			this.urlValue = this.url(tableState);
		} 
		
		if(this.urlValue == ''){
			this.callBackAfterError("no Fetch");
			return;
		}
		
		//console.log(tableState);
		
		
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
			//searchParams  += searchItem+"="+ tableState.search.predicateObject[searchItem]+"&";
		}
	}
	var call = this.urlValue + searchParams;
	if(call.search(/page=(\w+)/g)!=-1){
		if(page>-1)
			call = call.replace(/page=(\w+)/g, 'page='+page+'&');
	}else{
		if(page>-1)
			call += "page=" +page;
	}
	if(call.search(/size=(\w+)/g)!=-1){
		if(size>0)
			call = call.replace(/size=(\w+)/g, 'size='+size+'&');
	}else{
		if(size)
			call += "&size=" +size;
	}
	if(call.search(/limit=(\w+)/g)!=-1){
		if(size>0)
			call = call.replace(/limit=(\w+)/g, 'limit='+size+'&');
	}else{
		if(size>0)
			call += "&limit=" +size;
	}
	if(call.search(/sort=(\w+)/g)!=-1){
		if(sort!=""){
			var tmp = call.replace(/sort=(\w+),(\w+)/g, "sort="+sort+"," +sortDir);
			call = tmp;
		}
			
	}else{
		if(sort!="")
			call += "&sort=" +sort+ "," +sortDir;
	}
	
	//http://localhost:6060/api/v1/company/getInfo?limit=10&page=0&searchcriteria=kolkatta&sort=&sortDir=desc
	httpServices.get(call)
	.then(function(response){
		  tableState.pagination.numberOfPages = response.data.totalPages+1; // As the total pages is start from 0
		  tableState.pagination.totalItemCount = response.data.totalElements;
		  
		//  var resultObj = response.data.content;
		  var resultObj = response.data;
        //  tableState.pagination.numberOfPages = response.data.last;
         // tableState.pagination.totalItemCount = response.data.count;
          resultObj.tableState = tableState;
          this.callBackAfter(resultObj);
		  
		
	}.bind(this),
	function(response){
		if (this.callBackAfterError) {
            this.callBackAfterError(response);
        }
		
	}.bind(this));
	
	}.bind(this);
	

	
};

serverTableRetrive.prototype = {
		url : null,
		httpServices : null
		
	};
