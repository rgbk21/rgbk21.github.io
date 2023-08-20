$('.playNow').click(function() {
    let recordingName = $(this).attr('data-audio');
    const audio = new Audio(`assets/Lecture2/${recordingName}`);
    audio.play();
});
