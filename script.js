const audio = document.getElementById("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const songList = document.getElementById("songList");

const CLIENT_ID = "a7a994c0";

let songs = [];
let currentSong = 0;

async function loadOnlineSongs() {
    try {
        const res = await fetch(
            `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=20`
        );

        const data = await res.json();
        songs = data.results;

        songList.innerHTML = "";

        songs.forEach((song, index) => {
            songList.innerHTML += `
                <div class="song" onclick="playSong(${index})">
                    <img src="${song.image}">
                    <div>
                        <h3>${song.name}</h3>
                        <p>${song.artist_name}</p>
                    </div>
                    <i class="fa-solid fa-play"></i>
                </div>
            `;
        });

        if (songs.length > 0) {
            loadSong(0);
        }

    } catch (err) {
        console.log(err);
        alert("Jamendo API se songs load nahi hue.");
    }
}

function loadSong(index) {
    currentSong = index;

    audio.src = songs[index].audio;
    audio.load();

    title.textContent = songs[index].name;
    artist.textContent = songs[index].artist_name;
    cover.src = songs[index].image;
}function playSong(index) {
    loadSong(index);
    audio.play();
    play.innerHTML = "⏸";
}

play.onclick = function () {
    if (songs.length === 0) return;

    if (audio.paused) {
        audio.play();
        play.innerHTML = "⏸";
    } else {
        audio.pause();
        play.innerHTML = "▶";
    }
};

next.onclick = function () {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    playSong(currentSong);
};

prev.onclick = function () {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    playSong(currentSong);
};

audio.onended = function () {
    next.onclick();
};

loadOnlineSongs();
