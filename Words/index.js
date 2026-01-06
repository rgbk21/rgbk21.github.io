'use strict';

const url = "https://rgbk21-piggame-backend.onrender.com";
// const url = "http://localhost:8080";

const alertElmnt = document.querySelector('.alert--container');
const meaningFullCard = document.querySelector('.meaningfull-app');
const rhymerCard = document.querySelector('.rhymer-app');

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
      showAlertWithText('Bootup Complete! Initiate Activity!', true);
    },
    error: function (xhr, status, error) {
      console.error("Wake up failed:", status, error);
      showAlertWithText('Failed to wake up server.', true);
    }
  });

  showAlertWithText("Wake up request sent.");
}

if (meaningFullCard) {
  meaningFullCard.addEventListener('click', () => {
    window.location.href = './words.html';
  });
}

if (rhymerCard) {
  rhymerCard.addEventListener('click', () => {
    window.location.href = './rhymes/rhymes.html';
  });
}

function showAlertWithText(alertText, persistAlert = false) {
  const alertClass = persistAlert ? 'alert-danger' : 'alert-success';
  const html = `<div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                    ${alertText}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
  alertElmnt.insertAdjacentHTML("afterbegin", html);
}