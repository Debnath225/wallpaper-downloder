const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function(){
const reader = new FileReader();
reader.addEventListener("load", () => {
  unloaded_image = reader.result;
  document.quearySelector("#display_image").style.backgroundImage = `url(${upload_image})`

});
  reader.readAsDataURL(this.files[0]);

})
