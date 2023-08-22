
$(document).ready(function(){

   

    $("#add-dairy").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-dairy");
        let formdata = new FormData(form[0]);
        let postLink = 'addDairyAction';
        postForm(formdata,postLink,form);
       
    });
    
});