const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'e37mtrYTbLA-Hyqea-yvnJkFQqS8Te6r3co6YNeXNQg';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Helper function to set attributes on DOM elements 
function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links & Photos, add to DOM
function displayPhotos(){
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
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
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

// On Load
getPhotos();