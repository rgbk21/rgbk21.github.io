'use strict';

const btn_loadAllGists = document.querySelector('#load-all-gists');
btn_loadAllGists.addEventListener('click', function (e) {
    document.querySelectorAll('.code-snippet').forEach(elmnt => elmnt.style.display='block') ;
    btn_loadAllGists.blur();
});
