'use strict';

// The overarching understanding is this - in CSS we basically have classes that contain all of the styling that is required for
// a particular element. In order to modify the DOM, what we are doing is we are adding or removing the 'hidden' class from the list
// of classes associated with the element.
// This allows us to modify the DOM

// Using variables to store the elements so that we do not have to select the element every time
const imgs = document.querySelectorAll('.my-img');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.my-modal');
const fullImage = document.querySelector('#full-image');
// const closeModalBtn = document.querySelector('.close-modal');

const openFullImageOverlay = function () {
    // we are removing the 'hidden' class that will cause the element to appear on the viewport
    // Note: although we are removing the class 'hidden', we are passing in the args as 'hidden' and not '.hidden'
    // So there is no dot before the class name
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    fullImage.classList.remove('hidden');
    // Note how we are using 'this' to access the img element that has been clicked
    console.log(this.src);
    let optimizedImgSrc = this.src;
    console.log(`Optimized img: ${optimizedImgSrc}`);
    fullImage.src = optimizedImgSrc.replace('Optimized_I', 'i');;
    console.log(fullImage.src);
    // When it comes to removing or adding classes, we can add/removing multiple classes at the same time
    // The list of classes is passed comma separated. Eg.
    //     modal.classList.remove('hidden', 'class1', 'class2');
};

const closeFullImageOverlay = function () {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    fullImage.classList.add('hidden');
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
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeFullImageOverlay();
    }

    // Alternatively, we can also use. This method adds the class to the classlist if it is not present
    // and removes the class from the classlist if it is present
    // overlay.classList.toggle('hidden');


    //Just for reference:
    console.log(event);
});

// Close the overlay when the user clicks outside the image
overlay.addEventListener('click', closeFullImageOverlay);

// Close the overlay when the user clicks the cross button
// Cross button is removed from HTML because UGHH..
// closeModalBtn.addEventListener('click', closeFullImageOverlay);

