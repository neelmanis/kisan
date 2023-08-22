


$(document).ready(function(){

   

    $("#add-crop").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-crop");
        let formdata = new FormData(form[0]);
        let postLink = 'addCropAction';
        postForm(formdata,postLink,form);
       
    });
   
});