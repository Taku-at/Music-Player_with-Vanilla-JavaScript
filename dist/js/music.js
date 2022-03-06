const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImageIndex = 0;

const changeCarousel = () => {
  carousel[carouselImageIndex].classList.remove("active");
  // carousel[carouselImageIndex].classList.toggle('active');

  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }

  carousel[carouselImageIndex].classList.add("active");
  // carousel[carouselImageIndex].classList.toggle('active');
};

setInterval(() => {
  changeCarousel();
}, 3000);

/* ----------- Navigations ---------- */
// Toggling music player
const musicPlayerSection = document.querySelector(".music-player-section");

let clickCount = 1;

musicPlayerSection.addEventListener("dblclick", () => {
  musicPlayerSection.classList.add("active");
//   clickBack();
});

const clickBack = () => {
  // https://stackoverflow.com/questions/976343/how-can-i-check-if-a-javascript-eventhandler-has-been-set
  if (musicPlayerSection.classList.contains("active")) {
    musicPlayerSection.addEventListener("click", () => {
      musicPlayerSection.classList.remove("active");
    });
  }
};

/*
 Optional: one click pattern
 */
// musicPlayerSection.addEventListener('click', () => {
//     if(clickCount >= 2) {
//         musicPlayerSection.classList.add('active');
//         clickCount = 1;
//         return;
//     }

//     clickCount++;

//     setTimeout(() => {
//         clickCount = 1;
//     }, 250);
// })

// Back from music player
// const backToHomeBtn = document.querySelector('.music-player-section');

// backToHomeBtn.addEventListener('click', () => {
//     musicPlayerSection.classList.remove('active');
// })

// Access Playlist
const playlistSection = document.querySelector(".playlist");
const navBtn = document.querySelector(".music-player-section .nav-btn");
const backToPlayer = document.querySelector(".playlist .back-btn");

navBtn.addEventListener("click", () => {
  playlistSection.classList.add("active");
});

backToPlayer.addEventListener("click", () => {
  playlistSection.classList.remove("active");
});

/*---------- Music Player ---------- */
let currentMusic = 0;

const music = document.querySelector("#audio-source");

// Information of Player
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".current-song-name");
const artistName = document.querySelector(".current-song-name");
const coverImage = document.querySelector(".cover");
const currentMusicTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");

// Buttons
const forwardBtn = document.querySelector("i.fa-forward");
const backBtn = document.querySelector("i.fa-backward");
const playBtn = document.querySelector("i.fa-play");
const pauseBtn = document.querySelector("i.fa-pause");
const repeatBtn = document.querySelector("i.fa-redo");
const volumeBtn = document.querySelector("i.fa-volume-up");
const volumeSlider = document.querySelector(".volume-slider");

const queues = [...document.querySelectorAll('.queue')];

// Initial Volume
music.volume = 0.05;

// Play and pause
playBtn.addEventListener("click", () => {
    music.play();

  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
});

pauseBtn.addEventListener("click", () => {
    music.pause();

  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});

// Music Player Setup
const setMusic = (index) => {
  seekBar.value = 0;
  let song = songs[index];
  currentMusic = index;

  music.src = song.path;

  // Corrspond the information between current and index
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;

  // Duratoion
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
  // Initialize time
  currentMusicTime.innerHTML = "00 : 00";

  // Queue
  queues.forEach(item => item.classList.remove('active'));
  queues[currentMusic].classList.add('active');
};

setMusic(0);

// Format duration in 00 : 00. Default is 0:00.
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
    // min = '0' + min;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min} : ${sec}`;
};

// Seekbar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);

    // Repeat Conditional
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else {
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

// Forward Btn
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length -1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }

    setMusic(currentMusic);
    playBtn.click();
})

// Back Btn
backBtn.addEventListener('click', () => {
    if(currentMusic <= 0) {
        currentMusic = songs.length -1; // go to last length
    } else {
        currentMusic--;
    }

    setMusic(currentMusic);
    playBtn.click();
})

// Repeat btn
repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

// Volume Setting
volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

// Queues
queues.forEach((item, index) => {
    item.addEventListener('click', () => {
        setMusic(index);
        playBtn.click();
    })
})