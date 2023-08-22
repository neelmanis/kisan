
$(document).ready(function(){

   

    $("#update-dairy").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-dairy");
        let formdata = new FormData(form[0]);
        let postLink = 'updateDairyAction';
        postForm(formdata,postLink,form);
       
    });
    
});