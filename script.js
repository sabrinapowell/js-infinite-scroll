const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// unsplash API
const count = 30;
const apiKey = 'G50tWoaKG5eSKMK-9CNMQIvTt29xDb8nfwJDSYyO6aQ';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  photosArray.forEach((photo) => {
    // create <a> element to link to Unsplash
    let item = document.createElement("a");
    setAttributes(item, {
      "href": photo.links.html,
      "target": "_blank"
    });

    // create <img> for photo
    let img = document.createElement("img");
    setAttributes(img, {
      "src": photo.urls.regular,
      "alt": photo.alt_description !== null ? photo.alt_description : "",
      "title": photo.alt_description !== null ? photo.alt_description : ""
    });

    img.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put <a> inside the imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check to ssee if scrolling near bottom of page, then load more photos
window.addEventListener("scroll", () => {
  if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    ready = false;
  }
});

getPhotos();
