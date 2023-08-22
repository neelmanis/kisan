
var filterOptions = function(data){};
var columns =  [{ "targets": "_all", "orderable": false},{"targets":[0,1,2,3,4],"width":100}];
//var getId = 
$(document).ready(function(){
    let url = window.location.href; 
    let id = url.substring(url.lastIndexOf('/') + 1);
    table = dataTables("animalList",true,true,true,true,true,"dairy/getListedDairyRequestRecords/"+id,filterOptions,columns); 
});