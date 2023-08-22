
$(document).ready(function(){

   

    $("#update-equipment").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-equipment");
        let formdata = new FormData(form[0]);
        let postLink = 'updateEquipmentAction';
        postForm(formdata,postLink,form);
       
    });
 
});