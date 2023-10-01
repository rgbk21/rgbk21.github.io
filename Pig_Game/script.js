'use strict';

let currPlayer = 0;
let playerScore = 0;
let overallScorePlayer0 = 0;
let overallScorePlayer1 = 0;
let targetWinValue = 20;
let gameStatus;

// Selecting the elements as that we do not have to select the elements separately every time
const overallPlayer1ScoreElmnt = document.querySelector('.player1--score');
const overallPlayer2ScoreElmnt = document.querySelector('.player2--score');
const currScorePlayer1Elmnt = document.querySelector('#current--1');
const currScorePlayer2Elmnt = document.querySelector('#current--2');
const player1Elmnt = document.querySelector('.player1--container');
const player2Elmnt = document.querySelector('.player2--container');
const player1BtnsElmnt = document.querySelector('.player1--buttons');
const player2BtnsElmnt = document.querySelector('.player2--buttons');
const player1RollDiceBtn = document.querySelector('.player1--btn--rollDice .btn--roll');
const player2RollDiceBtn = document.querySelector('.player2--btn--rollDice .btn--roll');
const player1HoldBtn = document.querySelector('.player1--btn--hold .btn--hold');
const player2HoldBtn = document.querySelector('.player2--btn--hold .btn--hold');
const createNewGameBtn = document.querySelector('.btn--new');
const showOpenGamesBtn = document.querySelector('.btn--openGames');
// TODO: Uncomment the button.
// const challengeMeBtn = document.querySelector('.btn--challengeMeOption');

const diceContainer = document.querySelector('.dice-container');
const diceElmnt = document.querySelector('.dice');
const alertElmnt = document.querySelector('.alert--container');

const resetPage = function () {
    overallPlayer1ScoreElmnt.textContent = '0';
    overallPlayer2ScoreElmnt.textContent = '0';
    currScorePlayer1Elmnt.textContent = '0';
    currScorePlayer2Elmnt.textContent = '0';
    diceContainer.classList.add('hidden');
    player1Elmnt.classList.remove('player--winner');
    player1Elmnt.classList.add('player--active');
    player2Elmnt.classList.remove('player--winner', 'player--active');
    player1BtnsElmnt.classList.add("hidden");
    player2BtnsElmnt.classList.add("hidden");
    currPlayer = 0;
    playerScore = 0;
    overallScorePlayer0 = 0;
    overallScorePlayer1 = 0;
    gameStatus = '';
};

// Reset the page to remove garbage values when the page is first loaded
resetPage();

// When the player 2 has joined, we want to show the ROLL DICE and the HOLD buttons
function initializePlayer1Turn(gamePlay) {
    if (gamePlay.pl1Turn) {
        player1BtnsElmnt.classList.remove("hidden");
        player2BtnsElmnt.classList.add("hidden");
    } else if (gamePlay.pl2Turn) {
        player1BtnsElmnt.classList.add("hidden");
        player2BtnsElmnt.classList.remove("hidden");
    }
}

// When the game is finished, we want to hide both the players' buttons
function hideBothPlayerButtons() {
    player2BtnsElmnt.classList.add("hidden");
    player1BtnsElmnt.classList.add("hidden");
}

player1RollDiceBtn.addEventListener('click', rollDice);
player2RollDiceBtn.addEventListener('click', rollDice);
player1HoldBtn.addEventListener('click', hold);
player2HoldBtn.addEventListener('click', hold);
createNewGameBtn.addEventListener('click', createGame, false);
showOpenGamesBtn.addEventListener('click', listAllOpenGames);
// TODO: Uncomment this event listener.
// challengeMeBtn.addEventListener('click', sendGameChallengeNotification);

/*
document.querySelector('.btn--roll').addEventListener('click', function () {

    // gameStatus amkes sure that once the user has won, all the buttons on the page have been disabled
    if (gameStatus) {

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
                currScorePlayer1Elmnt.textContent = playerScore;
            } else {
                playerScore += diceRollVal;
                currScorePlayer2Elmnt.textContent = playerScore;
            }
        } else {
            // curr player rolled a 1
            // change the current score to 0 for the curr player
            playerScore = 0;

            if (currPlayer === 0) {
                currScorePlayer1Elmnt.textContent = '0';
                // and switch player
                currPlayer = 1;
                player1Elmnt.classList.toggle('player--active');
                player2Elmnt.classList.toggle('player--active');
            } else {
                currScorePlayer2Elmnt.textContent = '0';
                currPlayer = 0;
                player1Elmnt.classList.toggle('player--active');
                player2Elmnt.classList.toggle('player--active');
            }
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', function () {

    if (gameStatus) {

        if (currPlayer === 0) {
            overallScorePlayer0 += playerScore;
            if (overallScorePlayer0 >= targetWinValue) {
                overallPlayer1ScoreElmnt.textContent = overallScorePlayer0;
                currScorePlayer1Elmnt.textContent = '0';
                declareVictory();
            } else {
                // Pass turn over to Player 1
                overallPlayer1ScoreElmnt.textContent = overallScorePlayer0;
                currScorePlayer1Elmnt.textContent = '0';
                playerScore = 0;
                currPlayer = 1;
                player1Elmnt.classList.toggle('player--active');
                player2Elmnt.classList.toggle('player--active');
            }
        } else {
            overallScorePlayer1 += playerScore;
            if (overallScorePlayer1 >= targetWinValue) {
                overallPlayer2ScoreElmnt.textContent = overallScorePlayer1;
                currScorePlayer2Elmnt.textContent = '0';
                declareVictory();
            } else {
                // Pass turn over to Player 0
                overallPlayer2ScoreElmnt.textContent = overallScorePlayer1;
                currScorePlayer2Elmnt.textContent = '0';
                playerScore = 0;
                currPlayer = 0;
                player1Elmnt.classList.toggle('player--active');
                player2Elmnt.classList.toggle('player--active');
            }
        }
    }
});

// Start a new game
document.querySelector('.btn--new').addEventListener('click', function () {
    resetPage();
});

const declareVictory = function () {

    gameStatus = false;
    diceElmnt.classList.add('hidden');

    if (currPlayer === 0) {
        player1Elmnt.classList.add('player--winner');
    } else {
        player2Elmnt.classList.add('player--winner');
    }
};


 */
