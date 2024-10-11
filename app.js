"use strict";
const background = document.getElementById('content');
const buttonsWeather = document.querySelectorAll('.carousel-controls .control-button');
const audioSun = new Audio('./sounds/summer.mp3');
const audioRain = new Audio('./sounds/rain.mp3');
const audioSnow = new Audio('./sounds/winter.mp3');
const stopBtn = document.getElementById('play-pause-btn');
const weather = [
    { name: 'sunny', path: './images/summer-bg.jpg', sound: audioSun },
    { name: 'rainy', path: './images/rainy-bg.jpg', sound: audioRain },
    { name: 'snowy', path: './images/winter-bg.jpg', sound: audioSnow }
];
let currentAudio = null;
const changeBackground = (weatherType) => {
    const selectedWeather = weather.find(w => w.name === weatherType);
    if (selectedWeather) {
        background.style.backgroundImage = `url(${selectedWeather.path})`;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        background.classList.remove('sunny', 'rainy', 'snowy');
        background.classList.add(selectedWeather.name);
        currentAudio = selectedWeather.sound;
        currentAudio.play();
    }
    else {
        console.log(`Не найдено соответствие для погоды: ${weatherType}`);
    }
};
buttonsWeather.forEach((button) => {
    const weatherType = button.getAttribute('data-weather');
    if (weatherType) {
        button.addEventListener('click', () => {
            if (currentAudio && !currentAudio.paused && currentAudio.src.includes(weatherType)) {
                currentAudio.pause();
            }
            else {
                changeBackground(weatherType);
            }
        });
    }
    else {
        console.log('Атрибут data-weather не найден у кнопки.');
    }
});
stopBtn.addEventListener('click', () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
        }
        else {
            currentAudio.pause();
        }
    }
});
