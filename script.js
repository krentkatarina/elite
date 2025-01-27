const sliderButton = document.getElementById('slider-button');
const sliderBlock = document.querySelector('.range');
const videoBlock = document.querySelector('.video-block');
const video = document.querySelector('.video-main'); 
const firstScreen = document.querySelector('.first-screen');
const openVideoButton = document.getElementById('open-video');
const overlay = document.getElementById('overlay');
const closeVideoButton = document.getElementById('close-video');

sliderButton.addEventListener('click', function() {
    sliderBlock.classList.remove('inv');
    firstScreen.classList.add('inv')
});


openVideoButton.addEventListener('click', function () {
    overlay.classList.add('active');
    videoBlock.classList.remove('inv');
    video.currentTime = 0; 
    video.play(); 
});


closeVideoButton.addEventListener('click', function () {
    overlay.classList.remove('active');
    videoBlock.classList.add('inv');
    video.pause(); 
});


overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
        overlay.classList.remove('active');
        videoBlock.classList.add('inv');
        video.pause(); 
    }
});


const backButtonSLider = document.getElementById('back-slider');
backButtonSLider.addEventListener('click', function() {
    sliderBlock.classList.add('inv');
    firstScreen.classList.remove('inv')
})

const slider = document.getElementById('slider');
const sliderChoose = document.getElementById('choose');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const prevChoose = document.getElementById('prev-choose');
const nextChoose = document.getElementById('next-choose');
const nameElement = document.getElementById('name');
const slides = document.querySelectorAll('.slide');
const slidesChoose = document.querySelectorAll('.slide-choose');

let currentIndex = 1;
let currentIndexChoose = 1;

const cloneSlides = (sliderElement, slidesElement) => {
    const firstClone = slidesElement[0].cloneNode(true);
    const lastClone = slidesElement[slidesElement.length - 1].cloneNode(true);
    sliderElement.appendChild(firstClone);
    sliderElement.insertBefore(lastClone, slidesElement[0]);
};

const updateSlider = (sliderElement, currentIndex) => {
    sliderElement.style.transform = `translateX(-${currentIndex * 100}%)`;
    sliderElement.style.transition = 'transform 0.5s ease-in-out';
};

const updateSliderChoose = () => {
    sliderChoose.style.transform = `translateX(-${currentIndexChoose * 100}%)`;
    sliderChoose.style.transition = 'transform 0.5s ease-in-out';

    let slideIndex = (currentIndexChoose - 1 + slidesChoose.length) % slidesChoose.length;
    const currentSlide = slidesChoose[slideIndex];
    const currentImage = currentSlide.querySelector('.slide__image');
    selectedImageSrc = currentImage.src;
    const slideName = currentSlide.querySelector('.slide__name').textContent;
    nameElement.textContent = slideName;
};

cloneSlides(slider, slides);
cloneSlides(sliderChoose, slidesChoose);

prev.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = slides.length - 1;
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    } else {
        currentIndex--;
    }
    updateSlider(slider, currentIndex);
});

next.addEventListener('click', () => {
    if (currentIndex === slides.length) {
        currentIndex = 1;  // Перемещаем на второй слайд (без клонирования)
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    } else {
        currentIndex++;
    }
    updateSlider(slider, currentIndex);
});

prevChoose.addEventListener('click', () => {
    if (currentIndexChoose === 1) {
        currentIndexChoose = slidesChoose.length;
        sliderChoose.style.transition = 'none';
        sliderChoose.style.transform = `translateX(-${currentIndexChoose * 100}%)`;
        setTimeout(() => {
            sliderChoose.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    } else {
        currentIndexChoose--;
    }
    updateSliderChoose();
});

nextChoose.addEventListener('click', () => {
    if (currentIndexChoose === slidesChoose.length) {
        currentIndexChoose = 1;
        sliderChoose.style.transition = 'none';
        sliderChoose.style.transform = `translateX(-${currentIndexChoose * 100}%)`;
        setTimeout(() => {
            sliderChoose.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    } else {
        currentIndexChoose++;
    }
    updateSliderChoose();
});

updateSliderChoose();

const chooseButton = document.getElementById('choose-button');
const chooseBlock = document.querySelector('.game__choose');
chooseButton.addEventListener('click', function() {
    chooseBlock.classList.remove('inv');
    firstScreen.classList.add('inv')
});


const backChooseButton = document.getElementById('back-choose');
backChooseButton.addEventListener('click', function() {
    chooseBlock.classList.add('inv');
    firstScreen.classList.remove('inv')
});


const resultImage = document.querySelector('.result__content-image');
const playArena = document.querySelector('.play-arena');
const playButton = document.getElementById('play-button');
const ResultScore = document.querySelector('.result-score');

const gameContainer = document.getElementById('game-container');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

let score = 0;
let timeLeft = 20;
let gameInterval;

function createTarget() {
    const target = document.createElement('div');
    const points = Math.floor(Math.random() * 100) + 1;
    const colors = ['target-orange', 'target-blue', 'target-darkblue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    target.classList.add('target', randomColor);

    target.textContent = points;

    
    const size = Math.max(30, 100 - points); 
    target.style.width = `${size}px`;
    target.style.height = `${size}px`;

    const fontSize = size * 0.6; 
    target.style.fontSize = `${fontSize}px`;

    const maxX = gameContainer.clientWidth - size;
    const maxY = gameContainer.clientHeight - size;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    const clickSound = new Audio('./sounds/click.mp3');

    target.addEventListener('click', () => {
        score += points;
        scoreDisplay.textContent = score;

        clickSound.currentTime = 0; 
        clickSound.play();

        target.remove();
    });

    gameContainer.appendChild(target);

    setTimeout(() => {
        if (document.body.contains(target)) {
            target.remove();
        }
    }, 2000); 
}
const countdownElement = document.getElementById('countdown');

function showCountdown() {
    let count = 3; 
    countdownElement.style.display = 'block'; 
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        if (count === 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            startGame(); 
        }
    }, 1000);
}

playButton.addEventListener('click', function() {
    chooseBlock.classList.add('inv');
    playArena.classList.remove('inv');
    showCountdown(); 
});

const ResultVideo = document.querySelector('.video-result')

function startGame() {
    gameInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            endGame()
        } else {
            createTarget();
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        }
    }, 1000);
}
function endGame() {
    playArena.classList.add("inv");
    resultBlock.classList.remove("inv");
    ResultScore.textContent = score;
    scoreDisplay.textContent = 0;
    resultImage.src = selectedImageSrc;
    ResultVideo.currentTime = 0;
    ResultVideo.play();
  }

const resultBlock = document.querySelector('.result');


const backResultButton = document.getElementById('back-end');
backResultButton.addEventListener('click', function() {
    resultBlock.classList.add('inv')
    firstScreen.classList.remove('inv');
    score = 0;
    timeLeft = 20;
    timeDisplay.textContent = 20;
    ResultVideo.pause();

    const resultImageElement = resultBlock.querySelector('.result-image');
    if (resultImageElement) {
        resultImageElement.remove();
    }
});
