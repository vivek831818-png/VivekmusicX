const audio = document.getElementById("audio");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

let currentSong = 0;

// Pehla song load karo
loadSong(currentSong);

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
}

play.onclick = function () {

    if (audio.paused) {

        audio.play();
        play.innerHTML = "⏸";

    } else {

        audio.pause();
        play.innerHTML = "▶";

    }

};