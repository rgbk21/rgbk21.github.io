'use strict';

const showAllWordsBtn = document.querySelector('#show-all-words-button');
const hideAllWordsBtn = document.querySelector('#hide-all-words-button');
const allAnswers = document.querySelectorAll('.answer');

showAllWordsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('.answer').forEach(elmnt => elmnt.classList.remove('hidden'));
    showAllWordsBtn.blur();
});

hideAllWordsBtn?.addEventListener('click', function (e) {
    document.querySelectorAll('.answer').forEach(elmnt => elmnt.classList.add('hidden'));
    hideAllWordsBtn.blur();

    // Shuffle the divs inside the single-word-container
    // https://stackoverflow.com/a/62713103/8742428
    const allSingleWordsContainers = document.querySelectorAll('.single-word-container');
    let shuffle = [...allSingleWordsContainers];
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    shuffle.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

    const allWordsContainer = document.querySelector('.all-words-container');
    allWordsContainer.innerHTML = '';

    allWordsContainer.append(...shuffle);
});

allAnswers?.forEach(element =>
    element.addEventListener('click', function (e) {
        if (element.classList.contains('hidden')) {
            $(this).removeClass('hidden');
        }
    })
);
