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
