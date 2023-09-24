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
