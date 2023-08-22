
$(document).ready(function(){


    $("#update-crop").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-crop");
        //let formData = form.serialize();
        //var formdata = new FormData(this);
        let formdata = new FormData(form[0]);
        let postLink = 'updateCropAction';
        postForm(formdata,postLink,form);
       
    });
   
});