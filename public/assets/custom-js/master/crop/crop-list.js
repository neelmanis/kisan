
var filterOptions = function(data){};
var columns =  [{ "targets": "_all", "orderable": false},{"targets":[0,1,2,3,4],"width":100}];

$(document).ready(function(){

    table = dataTables("cropList",true,true,true,true,true,"crop/getRecords",filterOptions,columns); 
});