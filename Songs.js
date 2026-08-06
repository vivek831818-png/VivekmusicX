const audio = document.getElementById("audio");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const CLIENT_ID = "a7a994c0";

let songs = [];
let currentSong = 0;

async function loadOnlineSongs() {

    const res = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=20`
    );

    const data = await res.json();

    songs = data.results;

    loadSong(0);
}

loadOnlineSongs();

function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].audio;
    audio.load();

    title.textContent = songs[index].name;
    artist.textContent = songs[index].artist_name;
    cover.src = songs[index].image;
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
