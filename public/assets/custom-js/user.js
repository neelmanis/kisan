
var filterOptions = function(data){};
var columns =  [{ "targets": "_all", "orderable": false},{"targets":[0,1,2,3,4],"width":100}];

$(document).ready(function(){

     dataTables("userList",true,true,true,true,true,"admin/getRecords",filterOptions,columns); 
     dataTables("userListFrontend",true,true,true,true,true,"user/getRecords",filterOptions,columns); 

    $("#add-user").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-user");
        let formData = form.serialize();
        let postLink = 'addUserAction';
        postBasicForm(formData,postLink,form);
       
    });
    $("#update-user").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-user");
        let formData = form.serialize();
        let postLink = 'updateUserAction';
        postBasicForm(formData,postLink,form);
       
    });
    $("#update-user-frontend").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-user-frontend");
        let formData = form.serialize();
        let postLink = 'user/updateUserAction';
        postBasicForm(formData,postLink,form);
       
    });
   
});