
$(document).ready(function(){

   

    $("#add-equipment").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-equipment");
        let formdata = new FormData(form[0]);
        let postLink = 'addEquipmentAction';
        postForm(formdata,postLink,form);
       
    });
 
});