const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'e37mtrYTbLA-Hyqea-yvnJkFQqS8Te6r3co6YNeXNQg';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//Helper function to set attributes on DOM elements 
function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links & Photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> link to Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html, 
            target: '_blank',

        });
        // Create image for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error){
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();