CKEDITOR.replace( 'answer' );
$(document).ready(function(){

   

    $("#add-veternary").on("submit",function(e){
      for (instance in CKEDITOR.instances)
			{
				CKEDITOR.instances[instance].updateElement();
			}		  
        e.preventDefault();
        let form = $("#add-veternary");
        let formData = form.serialize();
        let postLink = 'addVeternaryAction';
        postBasicForm(formData,postLink,form);
       
    });
    $("#update-veternary").on("submit",function(e){
        for (instance in CKEDITOR.instances)
        {
          CKEDITOR.instances[instance].updateElement();
        }		
        e.preventDefault();
        let form = $("#update-veternary");
        let formData = form.serialize();
        let postLink = 'updateVeternaryAction';
        postBasicForm(formData,postLink,form);
       
    });

});