$('.playNow').click(function() {
    let recordingName = $(this).attr('data-audio');
    const audio = new Audio(`assets/${recordingName}`);
    // Why use 'void' here? To get rid of the warning: Promise returned is ignored.
    // https://stackoverflow.com/a/64234381/8742428
    void audio.play();
});

$('.top-icon').click(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});
