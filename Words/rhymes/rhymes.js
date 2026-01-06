'use strict';

const url = "https://rgbk21-piggame-backend.onrender.com";
// const url = "http://localhost:8080";

const wordInput = document.getElementById('word-input');
const addBtn = document.getElementById('add-word-button');
const listContainer = document.getElementById('word-list-container');
const submitBtn = document.getElementById('submit-button');

// Store words in an array to keep track of data
let wordsArray = [];

function handleAddWord() {
  const text = wordInput.value.trim();

  // Add at the start of the array.
  wordsArray.unshift(text);

  const inputElement = `
  <input readonly type="text" class="added-word form-control" value="${text}"/>
  `;

  listContainer.insertAdjacentHTML("afterbegin", inputElement);

  // Clear the input box and refocus
  wordInput.value = '';
  wordInput.focus();
}

addBtn.addEventListener('click', handleAddWord);

// Event Listener: Press "Enter" inside the input box
wordInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleAddWord();
  }
});

// Event Listener: Submit Button
submitBtn.addEventListener('click', async () => {
  const payload = { words: wordsArray };
  console.log("Submitting payload:", payload);
  const encodedWords = encodeURIComponent(JSON.stringify(wordsArray));
  window.location.href = `../meanings.html?words=${encodedWords}`;
});