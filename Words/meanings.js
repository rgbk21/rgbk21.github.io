'use strict';

const url = "https://rgbk21-piggame-backend.onrender.com";
// const url = "http://localhost:8080";
const wordsMap = new Map();

function populateUiWithWordData(data) {
  let wordsHtml = '';
  wordsMap.clear();

  for (let i = 0; i < data.length; i++) {
    wordsMap.set(data[i].id, data[i]);
    const wordHtml = `
      <div class="word-container">
        <div class="word" id="${data[i].id}">${data[i].word}</div>
      </div>
    `;
    wordsHtml += wordHtml;
  }

  document.querySelector('.words-container').innerHTML = wordsHtml;

  addEventListenersForEachWordDiv();
}

function updateUiWithMeaningOfSelectedWord(wordId) {
  console.log(wordId);
  const wordData = wordsMap.get(Number(wordId));
  if (wordData) {
    document.querySelector('.word-meanings-container').textContent = wordData.meaning;
  }
}

function addEventListenersForEachWordDiv() {
  const wordContainers = document.querySelectorAll('.word-container');
  wordContainers.forEach(container => {
    container.addEventListener('click', function () {
      const wordId = this.querySelector('.word').id;
      updateUiWithMeaningOfSelectedWord(wordId);
    });
  });
}

const fetchWordsForAlphabet = function (alphabet) {
  console.log(alphabet);

  $.ajax({
    url: url + `/words/alphabet?alphabet=${alphabet.toLowerCase()}`,
    type: 'GET',
    dataType: 'JSON',
    contentType: 'application/json',
    xhrFields: {
      withCredentials: true
    },
    success: function (data) {
      console.log(data);
      populateUiWithWordData(data);
    },
    failures: function (xhr, status, error) {
      console.error("Failed to fetch words:", status, error);
      showAlertWithText('Failed to fetch words for the selected Alphabet.', true);
    }
  });
};

// 1. Parse the query string from the URL (e.g., "?alphabet=A")
const urlParams = new URLSearchParams(window.location.search);

// 2. Get the specific value for 'alphabet' and call the function if it exists
const alphabet = urlParams.get('alphabet');
if (alphabet) {
  fetchWordsForAlphabet(alphabet);
} else {
  fetchWordsForAlphabet("A");
}
