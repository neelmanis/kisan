
$(document).ready(function(){

   

    $("#add-animal").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-animal");
        let formdata = new FormData(form[0]);
        let postLink = 'addAnimalAction';
        postForm(formdata,postLink,form);
       
    });
    
});