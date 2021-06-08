'use strict';

const btn_loadAllGists = document.querySelector('#load-all-gists');
const btn_showThisGist = document.querySelectorAll('.expand-code-snip-btn');

btn_loadAllGists.addEventListener('click', function (e) {
    document.querySelectorAll('.code-snippet').forEach(elmnt => elmnt.style.display='block');
    document.querySelectorAll('.expand-code-snip-btn').forEach(elmnt => elmnt.style.display='none');
    btn_loadAllGists.blur();
});

btn_showThisGist.forEach(btn => {
    btn.addEventListener('click', function (e){
        $(this).next( ".code-snippet" ).css( "display", "block" );
        $(this).css( "display", "none" );
    })
})
