'use strict';

// const url = "https://rgbk21-piggame-backend.onrender.com";
const url = "http://localhost:8080";

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
    }
  });
};

// 1. Parse the query string from the URL (e.g., "?alphabet=A")
const urlParams = new URLSearchParams(window.location.search);

// 2. Get the specific value for 'alphabet' and call the function if it exists
const alphabet = urlParams.get('alphabet');
if (alphabet) {
  fetchWordsForAlphabet(alphabet);
}
fetchWordsForAlphabet("A");