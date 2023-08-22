$(document).ready(function() { 
    $("#myUseriForm").on("submit",function(e){
      e.preventDefault();
      let form = $("#myUseriForm");
      let formData = form.serialize();
      let postLink = 'useri/update-useri';
      postBasicForm(formData,postLink,form);
    });   
    
    
    $("#addUser").on("submit",function(e){
      e.preventDefault();
      let form = $("#addUser");
      let formData = form.serialize();
      let postLink = 'useri/create-useri';
      postBasicForm(formData,postLink,form);
    });  
    
  })