
$(document).ready(function(){

   

    $("#add-fruit").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-fruit");
        let formData = form.serialize();
        let postLink = 'addFruitAction';
        postForm(formData,postLink,form);
       
    });
    $("#update-user").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-user");
        let formData = form.serialize();
        let postLink = 'updateUserAction';
        postForm(formData,postLink,form);
       
    });
});