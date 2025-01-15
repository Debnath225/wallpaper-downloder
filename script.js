const display_image =document.getElementById("display_image");
const CatDrag =document.getElementById("CatDrag");
const image_input‎=document.getElementById("image_input‎");

const getimg=image_input‎.value;
display_image.innerHTML=image_input.dataTransfer.getData(getimg);

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.CatDrag.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text/plain",event.CatDrag.id);
  event.display_image.appendChild(document.getElementById(data));
}
function clickCounter() {
  if (typeof(Storage) !== "undefined") {
    if (sessionStorage.clickcount) {
      sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
    } else {
      sessionStorage.clickcount = 1;
    }
    document.getElementByClassName("result").innerHTML = "You have like the photo " + sessionStorage.clickcount + " time(s) in this session.";
  } else {
    document.getElementByClassName("result").innerHTML = "Sorry, your browser does not support web storage...";
  }
}
