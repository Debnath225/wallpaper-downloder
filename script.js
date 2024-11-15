const image_input = document.querySelector("#image_input");
var uploaded_image = "";
 var uploaded_image = document.quearySelector("#display_image").style.backgroundImage = `url(${upload_image})`;

image_input.addEventListener("change", function(){
const reader = new FileReader();
reader.addEventListener("load", () => {
  uploaded_image = reader.result;
});
  reader.readAsDataURL(this.files[0]);

});
