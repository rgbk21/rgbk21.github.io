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
});

allAnswers?.forEach(element =>
    element.addEventListener('click', function (e) {
        if (element.classList.contains('hidden')) {
            $(this).removeClass('hidden');
        }
    })
);
