document.addEventListener("DOMContentLoaded", async () => {
    const imageContainer = document.getElementById('image-container');

    // Fetching image data from a JSON file
    async function fetchImageData() {
        try {
            const response = await fetch('Image data.json'); // Adjust the path if needed
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.images; // Assuming the JSON structure has an 'images' array
        } catch (error) {
            console.error("Error fetching image data:", error);
            return [];
        }
    }

    // Rendering images on the page
    function renderImages(images) {
        imageContainer.innerHTML = ''; // Clear existing images

        images.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';

            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.loding = image.lazy;
            imgElement.alt = image.title;
            imgElement.className = 'image';

            const titleElement = document.createElement('h3');
            titleElement.textContent = image.title;

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            // Share Button
            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share';
            shareButton.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Check out this image!',
                        text: image.title,
                        url: image.url,
                    }).then(() => console.log('Shared successfully'))
                      .catch(error => console.error('Error sharing:', error));
                } else {
                    alert('Web Share API is not supported in your browser.');
                }
            });

            // Download Button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = image.url;
                link.download = image.title || 'image';
                link.click();
            });

            buttonContainer.appendChild(shareButton);
            buttonContainer.appendChild(downloadButton);

            imageCard.appendChild(imgElement);
            imageCard.appendChild(titleElement);
            imageCard.appendChild(buttonContainer);

            imageContainer.appendChild(imageCard);
        });
    }

    // Initialize the app
    const images = await fetchImageData();
    renderImages(images);
});
//image input handling 
document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById("upload-input");
    const galleryContainer = document.getElementById("gallery-container");

    // Load previously saved images from localStorage
    function loadImagesFromLocalStorage() {
        const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        galleryContainer.innerHTML = ""; // Clear existing images

        savedImages.forEach((imageDataUrl) => {
            const imgElement = document.createElement("img");
            imgElement.src = imageDataUrl;
            galleryContainer.appendChild(imgElement);
        });
    }

    // Save new images to localStorage
    function saveImagesToLocalStorage(newImages) {
        const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
        const updatedImages = [...savedImages, ...newImages].slice(0, 5); // Keep only the last 5 images
        localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
        loadImagesFromLocalStorage();
    }

    // Event listener for file input
    uploadInput.addEventListener("change", (event) => {
        const files = Array.from(event.target.files);
        const imagePromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then((imageDataUrls) => {
            saveImagesToLocalStorage(imageDataUrls);
        }).catch((error) => {
            console.error("Error reading files:", error);
        });
    });

    // Initialize the gallery on page load
    loadImagesFromLocalStorage();
});
