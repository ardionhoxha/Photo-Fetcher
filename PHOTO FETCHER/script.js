function fetchImages() {
  document.getElementById("photos").innerHTML = "";
  fetchAndAppendPhotos(4);
}

function addMorePhotos() {
  fetchAndAppendPhotos(4);
}

function fetchAndAppendPhotos(count) {
  const isGrayscale = document.getElementById("grayscaleToggle").checked;

  for (let i = 0; i < count; i++) {
    let random = Math.floor(Math.random() * 150 + 1);

    fetch(`https://picsum.photos/id/${random}/info`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch image data");
        return response.json();
      })
      .then((data) => {
        const photo = document.createElement("img");
        photo.src = data.download_url;
        photo.alt = "Random Photo";

        if (isGrayscale) {
          photo.style.filter = "grayscale(100%)";
        }

        document.getElementById("photos").appendChild(photo);
      })
      .catch((error) => console.error("Error fetching image:", error));
  }
}

function toggleGrayscale() {
  const isChecked = document.getElementById("grayscaleToggle").checked;
  const photos = document.querySelectorAll("#photos img");

  photos.forEach((photo) => {
    photo.style.filter = isChecked ? "grayscale(100%)" : "none";
  });
}

fetchImages();