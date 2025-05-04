document.addEventListener("DOMContentLoaded", async () => {
  const imageContainer = document.getElementById("image-container");
  const nextPageButton = document.createElement("button");
  nextPageButton.textContent = "More Images";
  nextPageButton.className = "next-page-button";
  nextPageButton.className = "next-page-button";
  document.body.appendChild(nextPageButton);

  let currentPage = 1;
  const itemsPerPage = 50;

  // Fetching image data from a JSON file
  async function fetchImageData(page, limit) {
    try {
      const response = await fetch("Image data.json"); // Adjust the path if needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      return data.images.slice(startIndex, endIndex); // Paginate the images
    } catch (error) {
      console.error("Error fetching image data:", error);
      return [];
    }
  }

  // Rendering images on the page
  function renderImages(images) {
    images.forEach((image) => {
      const imageCard = document.createElement("div");
      imageCard.className = "image-card";

      const imgElement = document.createElement("img");
      imgElement.src = image.url;
      imgElement.alt = image.title;
      imgElement.className = "image";

      const titleElement = document.createElement("h3");
      titleElement.textContent = image.title;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "button-container";

      // Share Button
      const shareButton = document.createElement("button");
      shareButton.className = "share-button";
      shareButton.textContent = "Share";
      shareButton.addEventListener("click", () => {
        if (navigator.share) {
          navigator
            .share({
              title: "Check out this image!",
              text: image.title,
              url: image.url,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Web Share API is not supported in your browser.");
        }
      });

      // Download Button
      const downloadButton = document.createElement("button");
      downloadButton.className = "download-button";
      downloadButton.textContent = "Download";
      downloadButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = image.url;
        link.download = image.title || "image";
        link.click();
      });

      // Like Button
      const likeButton = document.createElement("button");
      likeButton.className = "like-button";
      likeButton.textContent = "Like";
      likeButton.addEventListener("click", () => {
        if (localStorage.getItem("likedImage") === image.title) {
          likeButton.innerHTML = "<i class='fa fa-thumbs-up'></i>";
          likeButton.style.backgroundColor = "green";
          likeButton.style.color = "white";
        } else {
          likeButton.innerHTML = "<i class='fa fa-thumbs-up'></i>";
          likeButton.style.backgroundColor = "green";
          likeButton.style.color = "white";
          localStorage.setItem("likedImage", image.title);
        }
      });

      buttonContainer.appendChild(likeButton);
      buttonContainer.appendChild(shareButton);
      buttonContainer.appendChild(downloadButton);

      imageCard.appendChild(imgElement);
      imageCard.appendChild(titleElement);
      imageCard.appendChild(buttonContainer);

      imageContainer.appendChild(imageCard);
    });
  }

  // Load images for the current page
  async function loadImages() {
    const images = await fetchImageData(currentPage, itemsPerPage);
    renderImages(images);

    // Hide the "Next Page" button if no more images are available
    if (images.length < itemsPerPage) {
      nextPageButton.style.display = "none";
    }
  }

  // Event listener for the "Next Page" button
  nextPageButton.addEventListener("click", () => {
    currentPage++;
    loadImages();
  });

  // Initialize the app
  loadImages();
});
