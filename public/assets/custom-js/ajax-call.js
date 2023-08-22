function postForm(formdata,postLink,form){
  $("label").removeClass("error");
  $("label").each(function(i,v) {
    let defaultText = $(this).data('title');
    $(this).html(defaultText);
  });
      $.ajax({
        type: "POST",
        data: formdata,
        url: `${window.location.origin}/`+postLink,
        mimeType : 'multipart/form-data',
        dataType: "json",
        cache:false,
        contentType: false,
        processData: false,
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
          //console.log(err.status);
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
              swal({
                title: err.responseJSON.title,
                icon: err.responseJSON.icon,
                text: err.responseJSON.message
              });
            } else {
              swal({
                title: "Fail",
                icon: "error",
                text: "oops! Server Erroring."
              });
            }
        }
      });
  }
  



  function postBasicForm(formdata,postLink,form){ 
  $("label").removeClass("error");
  $("label").each(function(i,v) {
    let defaultText = $(this).data('title');
    $(this).html(defaultText);
  });
  $.ajax({
    url: `${window.location.origin}/`+postLink,
    method: "POST",
    data: formdata,
    dataType: "json",
    success: function(data) {
      console.log(data);

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
      //console.log(err.status);
        if(err.status =="422"){
            var jsonResponseText = $.parseJSON(err.responseText);
            const errors = jsonResponseText.errors
            $.each(errors, function(index , item) {
              if(item.path){
                $("label[for='"+item.path+"']").html(item.msg); 
                $("label[for='"+item.path+"']").addClass("error");
                }
              });
            $('input[name="'+errors[0].path+'"]').focus();
        }else if(err.status =="401"){
          //console.log(err);
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
  }
  