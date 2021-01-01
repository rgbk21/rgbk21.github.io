'use strict';

let currPlayer = 0;
let playerScore = 0;
let overallScorePlayer0 = 0;
let overallScorePlayer1 = 0;
let targetWinValue = 20;
let gameInProgress = true;

// Selecting the elements as that we do not have to select the elements separately every time
const overallPlayer0ScoreElmnt = document.querySelector('#score--0');
const overallPlayer1ScoreElmnt = document.querySelector('#score--1');
const currScorePlayer0Elmnt = document.querySelector('#current--0');
const currScorePlayer1Elmnt = document.querySelector('#current--1');
const player0Elmnt = document.querySelector('.player--0');
const player1Elmnt = document.querySelector('.player--1');
const diceElmnt = document.querySelector('.dice');

const resetPage = function () {
    overallPlayer0ScoreElmnt.textContent = '0';
    overallPlayer1ScoreElmnt.textContent = '0';
    currScorePlayer0Elmnt.textContent = '0';
    currScorePlayer1Elmnt.textContent = '0';
    diceElmnt.classList.add('hidden');
    player0Elmnt.classList.remove('player--winner');
    player0Elmnt.classList.add('player--active');
    player1Elmnt.classList.remove('player--winner', 'player--active');
    currPlayer = 0;
    playerScore = 0;
    overallScorePlayer0 = 0;
    overallScorePlayer1 = 0;
    gameInProgress = true;
};

// Reset the page to remove garbage values when the page is first loaded
resetPage();

document.querySelector('.btn--roll').addEventListener('click', function () {

    if (gameInProgress) {

        // Generate a dice roll
        let diceRollVal = Math.trunc(Math.random() * 6) + 1;
        console.log(`Dice roll value is ${diceRollVal}`);

        // Change the dice image that is visible
        if (diceElmnt.classList.contains('hidden')) {
            diceElmnt.classList.remove('hidden');
        }
        diceElmnt.src = `dice-${diceRollVal}.png`;
        console.log(`Image loaded: dice-${diceRollVal}.png`);

        if (diceRollVal !== 1) {
            // Add the value of dice roll to the score of the curr player
            if (currPlayer === 0) {
                playerScore += diceRollVal;
                currScorePlayer0Elmnt.textContent = playerScore;
            } else {
                playerScore += diceRollVal;
                currScorePlayer1Elmnt.textContent = playerScore;
            }
        } else {
            // curr player rolled a 1
            // change the current score to 0 for the curr player
            playerScore = 0;

            if (currPlayer === 0) {
                currScorePlayer0Elmnt.textContent = '0';
                // and switch player
                currPlayer = 1;
                player0Elmnt.classList.toggle('player--active');
                player1Elmnt.classList.toggle('player--active');
            } else {
                currScorePlayer1Elmnt.textContent = '0';
                currPlayer = 0;
                player0Elmnt.classList.toggle('player--active');
                player1Elmnt.classList.toggle('player--active');
            }
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', function () {

    if (gameInProgress) {

        if (currPlayer === 0) {
            overallScorePlayer0 += playerScore;
            if (overallScorePlayer0 >= targetWinValue) {
                overallPlayer0ScoreElmnt.textContent = overallScorePlayer0;
                currScorePlayer0Elmnt.textContent = '0';
                declareVictory();
            } else {
                // Pass turn over to Player 1
                overallPlayer0ScoreElmnt.textContent = overallScorePlayer0;
                currScorePlayer0Elmnt.textContent = '0';
                playerScore = 0;
                currPlayer = 1;
                player0Elmnt.classList.toggle('player--active');
                player1Elmnt.classList.toggle('player--active');
            }
        } else {
            overallScorePlayer1 += playerScore;
            if (overallScorePlayer1 >= targetWinValue) {
                overallPlayer1ScoreElmnt.textContent = overallScorePlayer1;
                currScorePlayer1Elmnt.textContent = '0';
                declareVictory();
            } else {
                // Pass turn over to Player 0
                overallPlayer1ScoreElmnt.textContent = overallScorePlayer1;
                currScorePlayer1Elmnt.textContent = '0';
                playerScore = 0;
                currPlayer = 0;
                player0Elmnt.classList.toggle('player--active');
                player1Elmnt.classList.toggle('player--active');
            }
        }
    }
});

document.querySelector('.btn--new').addEventListener('click', function () {
    resetPage();
});

const declareVictory = function () {

    gameInProgress = false;
    diceElmnt.classList.add('hidden');

    if (currPlayer === 0) {
        player0Elmnt.classList.add('player--winner');
    } else {
        player1Elmnt.classList.add('player--winner');
    }
};




