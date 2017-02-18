
' use strict';

String.prototype.Capitalize = function(){
	var str = this;
	return str.charAt(0).toUpperCase() + str.substring(1,str.length-1) + str.charAt(str.length-1).toUpperCase();
};
String.prototype.FirstCapitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1);};
String.prototype.replaceParentHeader=function(find,replace)
{
	var str=this;return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'),'g'),replace);
};
function log(message){
  
}
log("rakesh kumar".Capitalize());
log("rakesh".FirstCapitalize());
log("dashboard.company".replaceParentHeader(".",">"));
