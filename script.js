const display_image=document.getElementById("display_image");
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
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
