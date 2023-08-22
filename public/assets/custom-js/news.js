$(document).ready(function () {
  $("#addNews").on("submit", function (e) {
    e.preventDefault();
    let form = $("#addNews");
    let formData = new FormData(form[0]);
    let postLink = "news/create-news";
    postForm(formData, postLink, form);
  });

  $("#newsUpdateForm").on("submit", function (e) {
    e.preventDefault();
    let form = $("#newsUpdateForm");
    let formData = form.serialize();
    let postLink = "news/update-news";
    postBasicForm(formData, postLink, form);
  });

  jQuery("#title").on("keyup", function (event) {
    //var value = String.fromCharCode(event.keyCode).toLowerCase();
    var $this = jQuery(this);

    var text = $this.val();
    text = text.replace(/'/g, "-").toLowerCase();
    text = text.replace(/ /g, "-").toLowerCase();
    jQuery("input[name=slug]").val(text);
  });

  $(".pic-name").hide();
  $("#remove-pic").hide();

  $("input[type=file]").on("change", function () {
    const fileName = this.files[0].name;

    if (fileName) {
      $(".pic-name").html(fileName);
      $(".pic-name").show();
      $("#remove-pic").show();
      $(".pic-uploader").hide();
    }
  });

  $("#remove-pic").on("click", function () {
    $("#pic").val("");
    $(".pic-name").html("");
    $(".pic-name").hide();
    $("#remove-pic").hide();
    $(".pic-uploader").show();
  });
});
