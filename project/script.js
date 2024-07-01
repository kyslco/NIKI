const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'music/backburner.mp3',
        displayName: 'Backburner',
        cover: 'images/1.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/chance.mp3',
        displayName: 'Take A Chance With Me',
        cover: 'images/2.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/keep.mp3',
        displayName: 'Keeping Tabs',
        cover: 'images/3.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/summer.mp3',
        displayName: 'Every Summertime',
        cover: 'images/4.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/autumn.mp3',
        displayName: 'Autumn',
        cover: 'images/5.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/b4.mp3',
        displayName: 'Before',
        cover: 'images/6.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/fb.mp3',
        displayName: 'Facebook Friends',
        cover: 'images/7.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/anaheim.mp3',
        displayName: 'Anaheim',
        cover: 'images/8.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/o&e.mp3',
        displayName: 'Ocean and Engines',
        cover: 'images/9.jpg',
        artist: 'NIKI',
    },
    {
        path: 'music/share.mp3',
        displayName: 'Apartment We Won\'t share',
        cover: 'images/10.jpg',
        artist: 'NIKI',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);