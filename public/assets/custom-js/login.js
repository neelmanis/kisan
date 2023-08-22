$(document).ready(function(){
  $("#auth-form").on("submit",function(e){
      e.preventDefault(); 
      const form = $("#auth-form");
      const formData = form.serialize();
      //const postLink = 'handleLogin';
      const postLink = 'admin/login';
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
                    if(item.path){
                      $("label[for='"+item.path+"']").html(item.msg); 
                      $("label[for='"+item.path+"']").addClass("error");
                      }
                    });
                  $('input[name="'+errors[0].path+'"]').focus();
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