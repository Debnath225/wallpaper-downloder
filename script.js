const display_image =document.getElementById("display_image");
const CatDrag =document.getElementById("CatDrag");
const image_input‎=document.getElementById("image_input‎").files[0];

let formData = new FormData();

formData.append('image_input', image_input);
fetch('/upload/image', {method: "POST", body: formData});


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


//like share and download handling 
// Handle Like Button
function handleLike(button, imageId) {
    // Retrieve current like count from localStorage
    let likeData = JSON.parse(localStorage.getItem('likes')) || {};
    let count = likeData[imageId] || 0;

    // Increment the like count
    count++;
    likeData[imageId] = count;

    // Save the updated like data to localStorage
    localStorage.setItem('likes', JSON.stringify(likeData));

    // Update the button text to reflect the new count
    button.innerText = `Like (${count})`;
}

// Handle Share Button
function handleShare(imageUrl) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this wallpaper!',
            text: 'Found this amazing wallpaper.',
            url: imageUrl,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        alert('Sharing is not supported in this browser.');
    }
}

// Initialize likes from localStorage on page load
function initializeLikes() {
    const likeData = JSON.parse(localStorage.getItem('likes')) || {};
    const buttons = document.querySelectorAll('.like-btn');

    buttons.forEach((button) => {
        const imageId = button.dataset.imageId;
        const count = likeData[imageId] || 0;
        button.innerText = `Like (${count})`;
    });
}

// Call initializeLikes when the page loads
document.addEventListener('DOMContentLoaded', initializeLikes);
