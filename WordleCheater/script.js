'use strict';

const url = "https://pig-game-rgbk21.herokuapp.com";
// const url = "http://localhost:8080";

let allPossibleAnswers;
let wordlePossibleAnswers;

const submitLettersBtn = document.querySelector('.btn-submit-words');
const alertElmnt = document.querySelector('.alert--container');

const checkbox1 = document.getElementById("letter1-cb");
const checkbox2 = document.getElementById("letter2-cb");
const checkbox3 = document.getElementById("letter3-cb");
const checkbox4 = document.getElementById("letter4-cb");
const checkbox5 = document.getElementById("letter5-cb");

const letter1 = document.getElementById("letter1");
const letter2 = document.getElementById("letter2");
const letter3 = document.getElementById("letter3");
const letter4 = document.getElementById("letter4");
const letter5 = document.getElementById("letter5");

const answersContainer = document.querySelector(".answers--container");
const wordleAnswersContainer = document.querySelector(".answers--container--wordleAnswers");
const allAnswersContainer = document.querySelector(".answers--container--allAnswers");

submitLettersBtn.addEventListener('click', sendRequestToServer);

window.addEventListener('load', function () {
    wakeUp();
})

function wakeUp() {
    $.ajax({
        url: url + '/game/gameInfo',
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log("Reply received");
        }
    });
}

function sendRequestToServer() {
    $.ajax({
        url: url + '/game/wordle/words',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        // Passing xhrFields argument is mandatory if you want to share cookies across different domains
        // If you do not pass this, cookies will be sent in the response from the backend to the frontend
        // but the cookies will never be stored in the 'Application > Session > Cookies' of the browser
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "letters": [
                letter1.value,
                letter2.value,
                letter3.value,
                letter4.value,
                letter5.value,
            ],
            "greenPositions": [
                checkbox1.checked,
                checkbox2.checked,
                checkbox3.checked,
                checkbox4.checked,
                checkbox5.checked,
            ]
        }),
        success: function (data) {
            allPossibleAnswers = data.allPossibleAnswers;
            wordlePossibleAnswers = data.wordlePossibleAnswers;
            alertElmnt.innerHTML = "";
            showAnswers(allPossibleAnswers, wordlePossibleAnswers);
            console.log('All Possible Answers: ' + allPossibleAnswers);
            console.log('Wordle Possible Answers: ' + wordlePossibleAnswers);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(`jqXHR: ${jqXHR}`);
            console.log(`textStatus: ${textStatus}`);
            console.log(`errorThrown: ${errorThrown}`);
            showAlertWithText("Error while trying to fetch answers. Please make sure the input is correct.", true);
        }
    });
    submitLettersBtn.blur();
}

function showAnswers(allPossibleAnswers, wordlePossibleAnswers) {
    wordleAnswersContainer.innerHTML = "";
    allAnswersContainer.innerHTML = "";

    const wordleAnswersElmnt = document.createElement('div');
    const allAnswersElmnt = document.createElement('div');
    let wordleAnswersText = "";
    let allAnswersText = "";
    for (let i = 0; i < wordlePossibleAnswers.length; i++) {
        wordleAnswersText += wordlePossibleAnswers[i] + ", ";
    }
    if (wordleAnswersText.length === 0) {
        wordleAnswersContainer.innerHTML = `ANSWERS FROM WORDLE LIST: No such combination of letters exists!`;
    } else {
        wordleAnswersContainer.innerHTML = `ANSWERS FROM WORDLE LIST: ${wordleAnswersText.slice(0,-2)}`;
    }

    for (let i = 0; i < allPossibleAnswers.length; i++) {
        allAnswersText += allPossibleAnswers[i] + ", ";
    }
    if (allAnswersText.length === 0) {
        allAnswersContainer.innerHTML = `ALL POSSIBLE 5 LETTER WORDS: No such combination of letters exists!`;
    } else {
        allAnswersContainer.innerHTML = `ALL POSSIBLE 5 LETTER WORDS: ${allAnswersText.slice(0,-2)}`;
    }
}

function showAlertWithText(alertText, alertBecauseFailure = false) {
    const alertClass = alertBecauseFailure ? 'alert-danger' : 'alert-success';
    const html = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                    ${alertText}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
    alertElmnt.insertAdjacentHTML("afterbegin", html);
}