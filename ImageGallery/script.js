'use strict';

// The overarching understanding is this - in CSS we basically have classes that contain all of the styling that is required for
// a particular element. In order to modify the DOM, what we are doing is we are adding or removing the 'hidden' class from the list
// of classes associated with the element.
// This allows us to modify the DOM

// Using variables to store the elements so that we do not have to select the element every time
const imgs = document.querySelectorAll('.my-img');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-container');
const modalFullscreenContent = document.querySelector('.modal-fullscreen-content');
const fullImage = document.querySelector('#full-image');
const closeModalBtn = document.querySelector('.close-modal-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const exitFullscreenBtn = document.querySelector('.exit-fullscreen-btn');
const imageCounter = document.querySelector('.image-counter');
const imageLoader = document.querySelector('.image-loader');
const previousImageBtns = document.querySelectorAll('.nav-prev-btn');
const nextImageBtns = document.querySelectorAll('.nav-next-btn');
let currentImageIndex = 0;

const showImageAt = function (index) {
    // Modulo keeps the gallery circular: previous from the first image shows the last,
    // and next from the last image returns to the first.
    currentImageIndex = (index + imgs.length) % imgs.length;
    const thumbnail = imgs[currentImageIndex];
    imageLoader.classList.add('is-loading');
    fullImage.src = thumbnail.src.replace('Optimized_I', 'i');
    fullImage.alt = thumbnail.alt || 'Full sized image';
    imageCounter.textContent = `${currentImageIndex + 1}/${imgs.length}`;

    // Cached images may already be complete before a new load event is dispatched.
    if (fullImage.complete) {
        imageLoader.classList.remove('is-loading');
    }
};

fullImage.addEventListener('load', function () {
    imageLoader.classList.remove('is-loading');
});
fullImage.addEventListener('error', function () {
    imageLoader.classList.remove('is-loading');
});

const openFullImageOverlay = function () {
    // Select the new image before displaying the modal so a previous image cannot flash.
    currentImageIndex = Array.prototype.indexOf.call(imgs, this);
    showImageAt(currentImageIndex);

    // we are removing the 'hidden' class that will cause the element to appear on the viewport
    // Note: although we are removing the class 'hidden', we are passing in the args as 'hidden' and not '.hidden'
    // So there is no dot before the class name
    modalContainer.classList.remove('hidden');

    // Prevent scrolling of the background when modal is open
    document.body.style.overflowY = 'hidden';
};

const closeFullImageOverlay = function () {
    if (document.fullscreenElement === modalFullscreenContent) {
        document.exitFullscreen();
    }

    modalContainer.classList.add('hidden');
    fullImage.removeAttribute('src');
    imageLoader.classList.remove('is-loading');
    // Remove the overflow class added to modal earlier to enable scrolling again
    document.body.style.overflowY = '';
};

for (let i = 0; i < imgs.length; i++) {
    // Adding an evenListener to each element.
    // Note that we are not doing openFullImageOverlay(), ie. we are not calling the function
    // We are just passing in the name of the function and telling JS to call it once the element is clicked.
    imgs[i].addEventListener('click', openFullImageOverlay);
}

// Close the overlay when the Esc key is pressed
// Note that the event is applied on the ENTIRE document - i.e. DOM - they are hence known as Global events,
// because they do not happen on one specific element.
// There are 3 types of events associated with keypresses - keydown, keypress, keyup. We mostly use keydown.
// Also note how we are passing in the 'event' that is passed in by JS. JS, when calling this function,
// is going to pass in the event as an argument.
document.addEventListener('keydown', function (event) {
    // Note how we are checking if the classList contains a specific class here
    // In this case, we want to close the overlay, only if it is not currently hidden.
    // Also note how we are reading the key that was pressed by using the 'e.key' property
    if (event.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
        closeFullImageOverlay();
    }

    if (!modalContainer.classList.contains('hidden')) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showImageAt(currentImageIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            showImageAt(currentImageIndex + 1);
        }
    }
});

closeModalBtn.addEventListener('click', closeFullImageOverlay);
fullscreenBtn.addEventListener('click', function () {
    modalFullscreenContent.requestFullscreen();
});
exitFullscreenBtn.addEventListener('click', function () {
    if (document.fullscreenElement === modalFullscreenContent) {
        document.exitFullscreen();
    }
});
previousImageBtns.forEach(function (button) {
    button.addEventListener('click', function () {
        showImageAt(currentImageIndex - 1);
    });
});
nextImageBtns.forEach(function (button) {
    button.addEventListener('click', function () {
        showImageAt(currentImageIndex + 1);
    });
});
