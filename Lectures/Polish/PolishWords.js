'use strict';

const allAnswers = document.querySelectorAll('.answer');
/// Shows the hidden meaning of the word when user clicks on the spoiler.
allAnswers?.forEach(element =>
    element.addEventListener('click', function (e) {
        if (element.classList.contains('hidden')) {
            $(this).removeClass('hidden');
        }
    })
);

$('.top-icon').click(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Methods handling the visibility of the words in the basic words section
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const showAllBasicWordsBtn = document.querySelector('#show-all-basic-words-button');
const hideAndRandomizeAllBasicWordsBtn = document.querySelector('#hide-and-randomize-all-basic-words-button');
const onlyHideAllBasicWordsBtn = document.querySelector('#only-hide-all-basic-words-button');

/// Show all words in the basic words section if they are hidden
showAllBasicWordsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('#basic-words-container .answer').forEach(elmnt => elmnt.classList.remove('hidden'));
    showAllWordsBtn.blur();
});

/// Hides all the words that are present in the basic words section and then randomizes them.
hideAndRandomizeAllBasicWordsBtn?.addEventListener('click', function (e) {
    _hideAllBasicWords();
    hideAndRandomizeAllBasicWordsBtn.blur();

    // Shuffle the divs inside the single-word-container
    // https://stackoverflow.com/a/62713103/8742428
    const allSingleBasicWordsContainers = document.querySelectorAll('#basic-words-container .single-word-container');
    let shuffle = [...allSingleBasicWordsContainers];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    const allBasicWordsContainer = document.querySelector('#basic-words-container .all-basic-words-container');
    allBasicWordsContainer.innerHTML = '';

    allBasicWordsContainer.append(...shuffle);
});

/// Only hides (does not randomize) all the words that are present in the Words and Adjectives section.
onlyHideAllBasicWordsBtn?.addEventListener('click', function (e) {
    _hideAllBasicWords();
    onlyHideAllBasicWordsBtn.blur();
});

function _hideAllBasicWords() {
    document.querySelectorAll('#basic-words-container .answer').forEach(elmnt => elmnt.classList.add('hidden'));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Methods handling the visibility of the words in the Words and Adjectives section.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showAllWordsBtn = document.querySelector('#show-all-words-button');
const hideAndRandomizeAllWordsBtn = document.querySelector('#hide-and-randomize-all-words-button');
const onlyHideAllWordsBtn = document.querySelector('#only-hide-all-words-button');

/// Show all words in the Words and Adjectives sections if they are hidden
showAllWordsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('#words-container .answer').forEach(elmnt => elmnt.classList.remove('hidden'));
    showAllWordsBtn.blur();
});

/// Hides all the words that are present in the Words and Adjectives section and then randomizes them.
hideAndRandomizeAllWordsBtn?.addEventListener('click', function (e) {
    _hideAllWords();
    hideAndRandomizeAllWordsBtn.blur();

    // Shuffle the divs inside the single-word-container
    // https://stackoverflow.com/a/62713103/8742428
    const allSingleWordsContainers = document.querySelectorAll('#words-container .single-word-container');
    let shuffle = [...allSingleWordsContainers];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    const allWordsContainer = document.querySelector('#words-container .all-words-container');
    allWordsContainer.innerHTML = '';

    allWordsContainer.append(...shuffle);
});

/// Only hides (does not randomize) all the words that are present in the Words and Adjectives section.
onlyHideAllWordsBtn?.addEventListener('click', function (e) {
    _hideAllWords();
    onlyHideAllWordsBtn.blur();
});

function _hideAllWords() {
    document.querySelectorAll('#words-container .answer').forEach(elmnt => elmnt.classList.add('hidden'));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Methods handling the visibility of the words in the verbs section.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const showAllVerbsBtn = document.querySelector('#show-all-verbs-button');
const hideAndRandomizeAllVerbsBtn = document.querySelector('#hide-and-randomize-all-verbs-button');
const onlyHideAllVerbsBtn = document.querySelector('#only-hide-all-verbs-button');
/// Show all words in the Words and Adjectives sections if they are hidden
showAllVerbsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('#verbs-container .answer').forEach(elmnt => elmnt.classList.remove('hidden'));
    showAllVerbsBtn.blur();
});

/// Hides all the words that are present in the Words and Adjectives section and then randomizes them.
hideAndRandomizeAllVerbsBtn?.addEventListener('click', function (e) {
    _hideAllVerbs();
    hideAndRandomizeAllVerbsBtn.blur();

    // Shuffle the divs inside the single-word-container
    // https://stackoverflow.com/a/62713103/8742428
    const allSingleWordsContainers = document.querySelectorAll('#verbs-container .single-word-container');
    let shuffle = [...allSingleWordsContainers];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    const allWordsContainer = document.querySelector('#verbs-container .all-verbs-container');
    allWordsContainer.innerHTML = '';

    allWordsContainer.append(...shuffle);
});

/// Only hides (does not randomize) all the words that are present in the Words and Adjectives section.
onlyHideAllVerbsBtn?.addEventListener('click', function (e) {
    _hideAllVerbs();
    onlyHideAllVerbsBtn.blur();
});

function _hideAllVerbs() {
    document.querySelectorAll('#verbs-container .answer').forEach(elmnt => elmnt.classList.add('hidden'));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Methods handling the visibility of the words in the Prepositions section
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** @type {HTMLButtonElement} */
const showAllPrepositionsBtn = document.querySelector('#show-all-prepositions-button');
/** @type {HTMLButtonElement} */
const hideAndRandomizeAllPrepositionsBtn = document.querySelector('#hide-and-randomize-all-prepositions-button');
/** @type {HTMLButtonElement} */
const onlyHideAllPrepositionsBtn = document.querySelector('#only-hide-all-prepositions-button');
/** @type {HTMLButtonElement} */
const swapWordsAndMeaningsBtn = document.querySelector('#swap-word-meaning-button');

/// Show all words in the Prepositions sections if they are hidden
showAllPrepositionsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('#prepositions-container .answer').forEach(elmnt => elmnt.classList.remove('hidden'));
    showAllPrepositionsBtn.blur();
});

/// Hides all the words that are present in the Prepositions section and then randomizes them.
hideAndRandomizeAllPrepositionsBtn?.addEventListener('click', function (e) {
    _hideAllPrepositions();
    hideAndRandomizeAllPrepositionsBtn.blur();

    // Shuffle the divs inside the single-word-container
    // https://stackoverflow.com/a/62713103/8742428
    const allSingleWordsContainers = document.querySelectorAll('#prepositions-container .single-word-container');
    let shuffle = [...allSingleWordsContainers];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    const allWordsContainer = document.querySelector('#prepositions-container .all-prepositions-container');
    allWordsContainer.innerHTML = '';

    allWordsContainer.append(...shuffle);
});

/// Only hides (does not randomize) all the words that are present in the Prepositions section.
onlyHideAllPrepositionsBtn?.addEventListener('click', function (e) {
    _hideAllPrepositions();
    onlyHideAllPrepositionsBtn.blur();
});

function _hideAllPrepositions() {
    document.querySelectorAll('#prepositions-container .answer').forEach(elmnt => elmnt.classList.add('hidden'));
}

/// Swap the word and the meaning values in the Preposition section
document.getElementById('swap-word-meaning-button').addEventListener('click', () => {
    // Select all the containers holding the individual words and answers
    const wordContainers = document.querySelectorAll('.single-word-container');

    // Loop through each container one by one
    wordContainers.forEach(container => {
        // Find the word and meaning elements within the current container
        const wordElement = container.querySelector('.word-name');
        const meaningElement = container.querySelector('.meaning');

        // Make sure both elements exist before trying to swap
        if (wordElement && meaningElement) {
            // Swap the HTML content using array destructuring
            [wordElement.innerHTML, meaningElement.innerHTML] = [meaningElement.innerHTML, wordElement.innerHTML];
        }

        _hideAllPrepositions();
        swapWordsAndMeaningsBtn.blur();
    });
});
