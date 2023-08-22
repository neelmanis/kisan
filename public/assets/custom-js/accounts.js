$(document).ready(function() {
 
  $("#myProfileForm").on("submit",function(e){
    e.preventDefault();
    let form = $("#myProfileForm");
    let formData = form.serialize();
    let postLink = 'admin/update-profile';
    postBasicForm(formData,postLink,form);
  });
  
  
  
  $("#resetPasswordForm").on("submit",function(e){
    e.preventDefault();        
  
    let formdata = new FormData(this);
    let url = 'admin/reset-password';
    
    postForm(url, formdata);
  });
  
})