'use strict';

const openGamesContainer = document.getElementById('open-games-container');
const gameSelectForm = document.querySelector('#select-open-games-form');

const url = "http://localhost:8080"
let stompClient;
let gameId;
let userSelectedGameId;

////////////////// Event Listeners
gameSelectForm.addEventListener("submit", function (event) {
    let data = new FormData(gameSelectForm);
    for (const entry of data) {
        userSelectedGameId = entry[1];
    }
    event.preventDefault();
    console.log(`Player 2 wants to connect to game with ID: ${userSelectedGameId}`);

    let userName = document.getElementById("player2Name")?.value;
    if (userName == null || userName === '') {
        userName = 'player2';
    }

    connectToGameWithId({
        "gameId" : userSelectedGameId,
        "player" : {
            "userName" : userName
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
            let data = JSON.parse(response.body);
            console.log(data);
        });
    })
}

function createGame() {
    let login = document.getElementById("player1Name")?.value;
    if (login == null || login === '') {
        login = 'player1';
    }
    $.ajax({
        url: url + '/game/start',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            "player": {
                "userName": login
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
    let login = document.getElementById("player2Name")?.value;
    if (login == null || login === '') {
        login = 'player2';
    }
    $.ajax({
        url: url + '/game/connect/random',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
                "userName": login
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

function showOverlay() {
    document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}
