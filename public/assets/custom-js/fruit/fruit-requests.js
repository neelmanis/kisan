
var filterOptions = function(data){};
var columns =  [{ "targets": "_all", "orderable": false},{"targets":[0,1,2,3,4],"width":100}];
//var getId = 
$(document).ready(function(){
    let url = window.location.href; 
    let id = url.substring(url.lastIndexOf('/') + 1);
    table = dataTables("cropList",true,true,true,true,true,"fruit/getListedFruitRequestRecords/"+id,filterOptions,columns); 
});