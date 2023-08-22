
$(document).ready(function(){

   

    $("#add-animal-breed").on("submit",function(e){
        e.preventDefault();
        let form = $("#add-animal-breed");
        let formData = form.serialize();
        let postLink = 'addAnimalBreedAction';
        $.ajax({
            url: `${window.location.origin}/`+postLink,
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(data) {
      
                swal({
                    title: data.title,
                    icon: data.icon,
                    text: data.message
                  }).then(function(){
                    if(data.isRedirect==true){
                      form[0].reset();
                      window.location.href = `${window.location.origin}/`+data.redirectUrl;
                    }else{
                      form[0].reset();
                    }
                  });
            },
            error: function(err) {
                if(err.status =="422"){
                    var jsonResponseText = $.parseJSON(err.responseText);
                    let errors = jsonResponseText.errors
                    $.each(errors, function(index , item) {
                      if(item.param){
                        $("label[for='"+item.param+"']").html(item.msg); 
                        $("label[for='"+item.param+"']").addClass("error");
                        }
                      });
                    $('input[name="'+errors[0].param+'"]').focus();
                }else if(err.status =="401"){
                  console.log(err);
                  swal({
                    title: err.responseJSON.title,
                    icon: err.responseJSON.icon,
                    text: err.responseJSON.message
                  });
              }else{
                  swal({
                    title: "Fail",
                    icon: "error",
                    text: "oops! Server Error."
                  });
                }
            }
          });
       
    });
    
});