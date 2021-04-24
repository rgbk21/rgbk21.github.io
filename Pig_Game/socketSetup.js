'use strict';

const openGamesContainer = document.getElementById('open-games-container');
const gameSelectForm = document.querySelector('#select-open-games-form');

const url = "http://localhost:8080"
let stompClient;
let gameId;
let userSelectedGameId;
let p1userName;
let p2userName;
let gamePlay;
let winner;

//////////////////////// Event Listeners
gameSelectForm.addEventListener("submit", function (event) {
    let formData = new FormData(gameSelectForm);
    for (const entry of formData) {
        userSelectedGameId = entry[1];
    }
    event.preventDefault();
    console.log(`Player 2 wants to connect to game with ID: ${userSelectedGameId}`);

    connectToGameWithId({
        "gameId" : userSelectedGameId,
        "player" : {
            "userName" : p2userName
        }
    });
    hideOverlay();
}, false);

//////////////////////// Socket Setup
function connectToSocket(gId) {
    let socket = new SockJS(url + '/gameplay');
    console.log(`socket is: ${socket}`);
    stompClient = Stomp.over(socket);
    console.log(`stompClient is: ${stompClient}`);
    stompClient.connect({}, function (frame) {
        console.log("Connected to the frame: " + frame);
        stompClient.subscribe("/topic/game-progress/" + gId, function (response) {
            gamePlay = JSON.parse(response.body);
            console.log(gamePlay);
            updateUI(gamePlay);
        });
    })
}

//////////////////////// Game Setup
function createGame() {
    p1userName = document.getElementById("player1Name")?.value;
    if (p1userName == null || p1userName === '') {
        p1userName = 'player1';
    }

    resetPage();

    $.ajax({
        url: url + '/game/start',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "player": {
                "userName": p1userName
            },
            "targetScore": 20
        }),
        success: function (data) {
            gameId = data.gameId;
            connectToSocket(gameId);
            console.log('Your created game id is: ' + data.gameId);
        },
        error: function (error) {
            console.log(`Error connecting to new game for player 1: ${error}`);
        }
    })
}

function listAllOpenGames() {
    let openGames;
    p2userName = document.getElementById("player2Name")?.value;
    if (p2userName == null || p2userName === '') {
        p2userName = 'player2';
    }
    $.ajax({
        url: url + '/game/connect/random',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
                "userName": p2userName
        }),
        success: function (data) {
            openGames = data;
            console.log('List of available open games: ' + openGames);
            if (openGames.length > 0) {
                openGames.forEach(
                    function (gameId, idx) {
                        const html = `<div>
                                        <input type="radio" id="contactChoice${idx}" name="selected-game" value="${gameId}">
                                        <label for="contactChoice${idx}">${gameId.split('-')[4]}</label>
                                      </div>`;
                        openGamesContainer.insertAdjacentHTML("afterbegin", html);
                    }
                )
            } else {
                // TODO: How are you going to handle the case where no active games are returned from the server
            }
            showOverlay();
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    })
}

function connectToGameWithId({gameId, player: {userName}}) {
    console.log(`GameId: ${gameId}, UserName: ${userName}`);
    $.ajax({
        url: url + '/game/connect',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "player" : {
                "userName" : userName
            },
            "gameId" : gameId
        }),
        success: function (data) {
            console.log(`Connected to game with ID: ${data.gameId}`);
            resetPage();
            if (data.gameStatus === 'IN_PROGRESS') {
                alert(`You are now playing with: ${data.p1UserName}`);
                connectToSocket(gameId);
            }
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    })
}

//////////////////////// Game Play
function rollDice() {
    console.log(`Roll Dice clicked for game id: ${gameId}`);
    $.ajax({
        url: url + '/game/gameplay/roll',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(gamePlay),
        success: function (data) {
            console.log(`Dice roll produced: ${data.diceRoll}`);
            updateUI(data);
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    })
}

function hold() {
    console.log(`Hold clicked for game id: ${gameId}`);
    $.ajax({
        url: url + '/game/gameplay/hold',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(gamePlay),
        success: function (data) {
            console.log(`Hold requested. Is it player 1's turn >> ${data.pl1Turn}`);
            console.log(`Hold requested: Is it player 2's turn >> ${data.pl2Turn}`);
            if (data.gameStatus === 'FINISHED' && data.winner?.userName !== null) {
                declareVictory(data);
            }
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    })
}

function updateUI(data) {
    if (data.diceRoll !== null && data.gameStatus === 'IN_PROGRESS') {
        if (diceElmnt.classList.contains('hidden')) {
            diceElmnt.classList.remove('hidden');
        }
        diceElmnt.src = `dice-${data.diceRoll}.png`;
        console.log(`Image loaded: dice-${data.diceRoll}.png`);

        currScorePlayer1Elmnt.textContent = data.p1PartialScore;
        currScorePlayer2Elmnt.textContent = data.p2PartialScore;
        overallPlayer1ScoreElmnt.textContent = data.p1TotalScore;
        overallPlayer2ScoreElmnt.textContent = data.p2TotalScore;

        if (data.pl1Turn) {
            player1Elmnt.classList.add('player--active');
            player2Elmnt.classList.remove('player--active');
        } else if (data.pl2Turn) {
            player2Elmnt.classList.add('player--active');
            player1Elmnt.classList.remove('player--active');
        }
    } else if (data.gameStatus === 'FINISHED') {
        declareVictory(data);
    }
}

function declareVictory(data) {
    winner = data.winner?.userName;
    diceElmnt.classList.add('hidden');

    if (winner === data.p1UserName) {
        player1Elmnt.classList.add('player--winner');
    } else if (winner === data.p2UserName) {
        player2Elmnt.classList.add('player--winner');
    }
    console.log(`Player with username ${winner} has won!`);
}
//////////////////////// Utils

function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}
