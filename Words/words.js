'use strict';

const url = "https://rgbk21-piggame-backend.onrender.com";

const alertElmnt = document.querySelector('.alert--container');

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
    }
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
    }
  });
};

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