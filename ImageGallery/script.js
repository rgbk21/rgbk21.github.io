'use strict';

const imgs = document.querySelectorAll('.my-img');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.my-modal');
const fullImage = document.querySelector('#full-image');
// const closeModalBtn = document.querySelector('.close-modal');

const openFullImageOverlay = function () {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    fullImage.classList.remove('hidden');
    fullImage.src = this.src;
    console.log(fullImage.src);
};

const closeFullImageOverlay = function () {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    fullImage.classList.add('hidden');
};

for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', openFullImageOverlay);
}

// Close the overlay when the Esc key is pressed
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeFullImageOverlay();
    }
});

// Close the overlay when the user clicks outside the image
overlay.addEventListener('click', closeFullImageOverlay);

// Close the overlay when the user clicks the cross button
// Cross button is removed from HTML because UGHH..
// closeModalBtn.addEventListener('click', closeFullImageOverlay);

