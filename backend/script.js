document.getElementById('toggleImg').addEventListener('click', function() {
    var audio = document.getElementById('audioPlayer');
    var img = document.getElementById('toggleImg');
    if (audio.paused) {
        audio.play();
        img.src = './assets/images/musicplaying.webp';
    } else {
        audio.pause();
        img.src = './assets/images/musicplaying.jpg';
    }
});

document.getElementById('audioPlayer').addEventListener('play', function() {
    document.getElementById('toggleImg').src = './assets/images/musicplaying.webp';
});

document.getElementById('audioPlayer').addEventListener('pause', function() {
    document.getElementById('toggleImg').src = './assets/images/musicplaying.jpg';
});
