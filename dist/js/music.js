const carousel = [...document.querySelectorAll('.carousel img')];


let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.remove('active');
    // carousel[carouselImageIndex].classList.toggle('active');
    

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.add('active');
    // carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000)


/* ----------- Navigations ---------- */
// Toggling music player
const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('dblclick', () => {
    musicPlayerSection.classList.add('active');
    clickBack();
})

const clickBack = () => {
        // https://stackoverflow.com/questions/976343/how-can-i-check-if-a-javascript-eventhandler-has-been-set
        if(musicPlayerSection.classList.contains('active')) {
             musicPlayerSection.addEventListener('click', () => {
                musicPlayerSection.classList.remove('active');
            })
        }
}

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
const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');
const backBtn = document.querySelector('.playlist .back-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

backBtn.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})
