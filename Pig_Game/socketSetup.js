'use strict';

const openGamesContainer = document.getElementById('open-games-container');
const gameSelectForm = document.querySelector('#select-open-games-form');
const closeOpenGamesOverlayBtn = document.querySelector('.open-games-close-overlay-btn');
const settingsBtn = document.querySelector('.btn-settings');
const closeSettingsOverlayBtn = document.querySelector('.settings-close-overlay-btn');
const targetScoreForm = document.querySelector('#select-target-score-form');

// const url = "http://localhost:8080";
const url = "https://pig-game-rgbk21.herokuapp.com";

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

targetScoreForm.addEventListener("submit", function (event) {
    let formData = new FormData(targetScoreForm);
    for (const entry of formData) {
        targetWinValue = entry[1];
    }
    event.preventDefault();
    hideSettingsOverlay();
}, false);

closeOpenGamesOverlayBtn.addEventListener('click', function (event){
    hideOverlay();
})

settingsBtn.addEventListener('click', function (event){
    showSettingsOverlay();
})
closeSettingsOverlayBtn.addEventListener('click', function (event){
    hideSettingsOverlay();
})
//////////////////////// Socket Setup
function connectToSocket(gId) {
    let socket = new SockJS(url + '/gameplay');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe("/topic/game-progress/" + gId, function (response) {
            gamePlay = JSON.parse(response.body);
            console.log(`Received payload from socket. Triggering UI refresh`);
            updateUI(gamePlay);
        });
    })
}

//////////////////////// Game Setup
function createGame(event) {

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
        // Passing xhrFields argument is mandatory if you want to share cookies across different domains
        // If you do not pass this, cookies will be sent in the response from the backend to the frontend
        // but the cookies will never be stored in the 'Application > Session > Cookies' of the browser
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "player": {
                "userName": p1userName
            },
            "targetScore": targetWinValue
        }),
        success: function (data) {
            gameId = data.gameId;
            gameStatus = data.gameStatus;
            connectToSocket(gameId);
            showAlertWithText(`Game created with gameID: <strong>${data.gameId.split('-')[4]}</strong>, target score: <strong>${data.targetScore}</strong> <br> 
                            In their own browser, tell player 2 to click on 'Show Open Games' and then select the above gameID`
            );
            console.log('Game created with ID: ' + data.gameId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(`jqXHR: ${jqXHR}`);
            console.log(`textStatus: ${textStatus}`);
            console.log(`errorThrown: ${errorThrown}`);
        }
    });

    createNewGameBtn.blur();
}

function listAllOpenGames(event) {

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
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
                "userName": p2userName
        }),
        success: function (data) {
            openGames = data.openGames;
            console.log('List of available open games: ' + openGames);
            if (openGames.length > 0) {
                openGamesContainer.innerHTML = '';
                openGames.forEach(
                    function (gameId, idx) {
                        const html = `<div>
                                        <input type="radio" id="contactChoice${idx}" name="selected-game" value="${gameId}">
                                        <label for="contactChoice${idx}">${gameId.split('-')[4]}</label>
                                      </div>`;
                        openGamesContainer.insertAdjacentHTML("afterbegin", html);
                    }
                )
                showOverlay();
            } else {
                showAlertWithText(data.errorInfoList[0].messageText);
                // TODO: How are you going to handle the case where no active games are returned from the server
            }
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    });

    showOpenGamesBtn.blur();
}

function connectToGameWithId({gameId, player: {userName}}) {
    console.log(`Sending request to connect to GameId: ${gameId}, UserName: ${userName}`);
    $.ajax({
        url: url + '/game/connect',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "player" : {
                "userName" : userName
            },
            "gameId" : gameId
        }),
        success: function (data) {
            if (data.errorInfoList.length === 0) {
                console.log(`Connected to game with ID: ${data.gameId}`);
                resetPage();
                if (data.gameStatus === 'IN_PROGRESS') {
                    connectToSocket(gameId);
                    gameStatus = data.gameStatus;
                    // alert(`You are now playing with: ${data.p1UserName}`);
                    showAlertWithText(`You are now playing with: ${data.p1UserName} <br>
                                    Target score to win is: ${data.targetScore}`);
                }
            } else {
                showAlertWithText(data.errorInfoList[0].messageText);
            }
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    })
}

//////////////////////// Game Play
function rollDice(event) {

    console.log(`New dice roll requested`);

    $.ajax({

        // The URL of the server-side resource to which the request is sent
        // If an empty string is passed, the request is sent to the current URL at the time the method is invoked.
        url: url + '/game/gameplay/roll',

        // The HTTP method to use. Usually either POST or GET. If omitted, the default is GET.
        type: 'POST',

        // (String) In its basic form, it’s a keyword that identifies the type of data that’s expected to be returned by the response.
        // This value determines what, if any, postprocessing occurs upon the data before being passed to callback functions.
        // valid values are: xml/html/json/jsonp/script/text
        dataType: 'JSON',

        // (String) The content type to be specified on the request. If omitted, the default is 'application/x-www-form-urlencoded; charset=UTF-8',
        // the same type used as the default for form submissions.
        contentType: 'application/json',

        // (Object) An object of name-value pairs to set on the native XHR object. By default, the object is empty.
        xhrFields: {
            withCredentials: true
        },

        // (String|Object|Array) Defines the values that will be sent to the server.
        // If the request is a GET, the values are passed as the query string.
        // If a POST, the values are passed as the request body.
        data: JSON.stringify(gamePlay),

        // (Function|Array) A function or an array of functions invoked if the response to the request indicates a success status code.
        // The response body is returned as the first parameter to this function and evaluated according to the specification of the dataType property.
        success: function (data) {
            console.log(`Dice roll produced: ${data.diceRoll}`);
            // We don't need to call updateUI here. This method is already being called by the connectToSocket method
            // that we have open at the top of this file. Calling the updateUI method here as well causes the method to execute twice.
            // The data flows as follows:
            // POST request is made to the backend which returns the gamePlay object
            // The open socket connection at the top also receives the same gamePlay object and that triggers the updateUI method
            // Hence no need to call updateUI method here. The connectToSocket method will do that for us.

            // updateUI(data);
        },

        // (Function|Array) A function or an array of functions invoked if the response to the request returns an error status code.
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    });

    player1RollDiceBtn.blur();
    player2RollDiceBtn.blur();
}

function hold(event) {

    console.log(`Hold requested`);

    $.ajax({
        url: url + '/game/gameplay/hold',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(gamePlay),
        success: function (data) {
            if (data.gameStatus === 'FINISHED' && data.winner?.userName !== null) {
                // We don't need to declareVictory here. This method is already being called by the updateUI method, which is called by the connectToSocket method
                // that we have open at the top of this file. Calling the declareVictory method here as well causes the method to execute twice.
                // The data flows as follows:
                // POST request is made to the backend which returns the gamePlay object
                // The open socket connection at the top also receives the same gamePlay object and that triggers the updateUI method
                // Hence no need to call declareVictory method here. The updateUI method will do that for us.

                // declareVictory(data);
            }
        },
        error: function (error) {
            console.log(`Error fetching available open games: ${error}`);
        }
    });

    player1HoldBtn.blur();
    player2HoldBtn.blur();
}

function testOnly() {
    $.ajax({
        url: url + '/game/gameInfo',
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
        xhrFields: {
            withCredentials: true
        },
        // data: JSON.stringify(gamePlay),
        success: function (data) {
            console.log(`Success: ${data}`);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(`jqXHR.status: ${jqXHR.status}`);
            console.log(`textStatus: ${textStatus}`);
            console.log(`errorThrown: ${errorThrown}`);
        }
    })
}

function updateUI(data) {

    // If game status in the received data object is 'IN_PROGRESS' and the game status in the
    // local memory is 'NEW'
    // It means that player 2 has joined the game
    // in which case we can remove the hidden class from the Player 1's display
    if (gameStatus === 'NEW' && data.gameStatus === 'IN_PROGRESS') {
        initializePlayer1Turn(data);
        gameStatus = data.gameStatus;
        showAlertWithText(`Player 2 has entered the game as: ${data.p2UserName} <br>
                            Target score to win is: ${data.targetScore}`);
    }

    if (data.diceRoll !== null && data.gameStatus === 'IN_PROGRESS') {
        if (diceContainer.classList.contains('hidden')) {
            diceContainer.classList.remove('hidden');
        }
        diceElmnt.src = `dice-${data.diceRoll}.png`;

        currScorePlayer1Elmnt.textContent = data.p1PartialScore;
        currScorePlayer2Elmnt.textContent = data.p2PartialScore;
        overallPlayer1ScoreElmnt.textContent = data.p1TotalScore;
        overallPlayer2ScoreElmnt.textContent = data.p2TotalScore;

        if (data.pl1Turn) {
            player1Elmnt.classList.add('player--active');
            player1BtnsElmnt.classList.remove("hidden");
            player2Elmnt.classList.remove('player--active');
            player2BtnsElmnt.classList.add("hidden");
        } else if (data.pl2Turn) {
            player1Elmnt.classList.remove('player--active');
            player1BtnsElmnt.classList.add("hidden");
            player2Elmnt.classList.add('player--active');
            player2BtnsElmnt.classList.remove("hidden");
        }
    }
    // In case the message received from the websocket is that the game is over
    else if (data.gameStatus === 'FINISHED') {
        declareVictory(data);
    }
}

function declareVictory(data) {

    winner = data.winner?.userName;
    diceContainer.classList.add('hidden');

    currScorePlayer1Elmnt.textContent = data.p1PartialScore;
    currScorePlayer2Elmnt.textContent = data.p2PartialScore;
    overallPlayer1ScoreElmnt.textContent = data.p1TotalScore;
    overallPlayer2ScoreElmnt.textContent = data.p2TotalScore;

    if (winner === data.p1UserName) {
        player1Elmnt.classList.add('player--winner');
    } else if (winner === data.p2UserName) {
        player2Elmnt.classList.add('player--winner');
    }
    hideBothPlayerButtons();
    if (gameStatus === 'IN_PROGRESS') {
        showAlertWithText(`${winner} has won!`);
        gameStatus = 'FINISHED';
    }
    console.log(`Player with username ${winner} has won!`);
}
//////////////////////// Utils

function showOverlay() {
    document.querySelector(".overlay").classList.remove("hidden");
    // document.getElementById("overlay").style.display = "grid";
}
function hideOverlay() {
    document.querySelector(".overlay").classList.add("hidden");
}

function showSettingsOverlay() {
    document.querySelector(".settings").classList.remove("hidden");
}
function hideSettingsOverlay() {
    document.querySelector(".settings").classList.add("hidden");
}

function showAlertWithText(alertText) {
    const html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${alertText}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
    alertElmnt.insertAdjacentHTML("afterbegin", html);
}