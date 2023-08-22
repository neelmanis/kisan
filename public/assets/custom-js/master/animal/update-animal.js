
$(document).ready(function(){
    $("#update-animal").on("submit",function(e){
        e.preventDefault();
        let form = $("#update-animal");
        let formdata = new FormData(form[0]);
        let postLink = 'updateAnimalAction';
        postForm(formdata,postLink,form);
       
    });
});