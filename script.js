'use strict';

const btn_loadAllGists = document.querySelector('#load-all-gists');
const btn_showThisGist = document.querySelectorAll('.expand-code-snip-btn');
const showImageBtns = document.querySelectorAll('.expand-screenshot-image-btn');
const scrollToTopButton = document.getElementById('scrollToTopBtn');

btn_loadAllGists?.addEventListener('click', function (e) {
    document.querySelectorAll('.code-snippet').forEach(elmnt => elmnt.style.display='block');
    document.querySelectorAll('.expand-code-snip-btn').forEach(elmnt => elmnt.style.display='none');
    btn_loadAllGists.blur();
});

btn_showThisGist?.forEach(btn => {
    btn.addEventListener('click', function (e){
        $(this).next( ".code-snippet" ).toggle("displHiHHHhhshdkhfalshdfkahjskldjfay");
        // $(this).next( ".code-snippet" ).css( "display", "block" );
        // $(this).css( "display", "none" );
    })
})

showImageBtns?.forEach(btn =>
    btn.addEventListener('click', function (e){
        $(this).next( ".screenshot-image" ).toggle("display");
    })
);

if (scrollToTopButton) {
  // When the user clicks on the button, scroll to the top of the document
  scrollToTopButton.addEventListener("click", function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}