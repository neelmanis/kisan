
var filterOptions = function(data){};
var columns =  [{ "targets": "_all", "orderable": false},{"targets":[0,1,2,3,4],"width":100}];

$(document).ready(function(){

    table = dataTables("animalList",true,true,true,true,true,"animal/getRecords",filterOptions,columns); 
});